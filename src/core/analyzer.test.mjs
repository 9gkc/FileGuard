import { describe, it, expect, afterEach } from "vitest";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import AdmZip from "adm-zip";
import analyzer from "./analyzer.cjs";
import reports from "./reports.cjs";

const { analyzeFile } = analyzer;
const { createReport } = reports;
const temporary = [];

async function fixture(name, content) {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), "fileguard-test-"));
  temporary.push(folder);
  const target = path.join(folder, name);
  await fs.writeFile(target, content);
  return target;
}

afterEach(async () => {
  await Promise.all(temporary.splice(0).map((folder) => fs.rm(folder, { recursive: true, force: true })));
});

describe("FileGuard local analyzer", () => {
  it("identifies a disguised executable by filename and signature without executing it", async () => {
    const target = await fixture("invoice.pdf.exe", Buffer.from("MZ\x00\x00synthetic-fixture"));
    const result = await analyzeFile(target);
    expect(result.actualType).toBe("Windows PE executable");
    expect(result.indicators.map((item) => item.id)).toContain("filename.double_extension");
    expect(result.privacy.executed).toBe(false);
    expect(result.sha256).toHaveLength(64);
  });

  it("flags static PDF action markers without opening the document", async () => {
    const target = await fixture("memo.pdf", "%PDF-1.7\n1 0 obj << /OpenAction 2 0 R /JavaScript (placeholder) >> endobj");
    const result = await analyzeFile(target);
    expect(result.indicators.map((item) => item.id)).toContain("pdf.active_content");
    expect(result.risk.score).toBeGreaterThanOrEqual(35);
  });

  it("lists ZIP contents and detects an executable entry without extracting it", async () => {
    const folder = await fs.mkdtemp(path.join(os.tmpdir(), "fileguard-zip-"));
    temporary.push(folder);
    const target = path.join(folder, "bundle.zip");
    const zip = new AdmZip();
    zip.addFile("readme.txt", Buffer.from("training fixture"));
    zip.addFile("notice.pdf.exe", Buffer.from("MZ\x00fixture"));
    zip.writeZip(target);
    const result = await analyzeFile(target);
    expect(result.archive.entryCount).toBe(2);
    expect(result.archive.nestedExecutableCount).toBe(1);
    expect(result.indicators.map((item) => item.id)).toContain("archive.executable_entry");
  });

  it("creates Arabic and English reports from local analysis evidence", async () => {
    const target = await fixture("plain.txt", "local training text");
    const result = await analyzeFile(target);
    expect(createReport(result, "markdown", "en")).toContain("FileGuard Local Triage Report");
    expect(createReport(result, "markdown", "ar")).toContain("تقرير الفرز المحلي");
    expect(JSON.parse(createReport(result, "json", "en")).fileName).toBe("plain.txt");
  });
});
