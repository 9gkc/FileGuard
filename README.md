# FileGuard

> **Safe local file triage, without execution or automatic upload.**

FileGuard is a bilingual desktop tool that helps students, IT teams, and defenders review suspicious files without opening or running them. It identifies common file signatures, calculates SHA-256, inventories ZIP-compatible archives without extracting them, checks for filename deception, locates selected static indicators, and creates explainable reports in **Arabic** or **English**.

## What FileGuard does

| Capability | Defensive outcome |
| :--- | :--- |
| Signature-based type detection | Reveals when a file’s actual header differs from its filename extension. |
| SHA-256 | Preserves a stable local identifier for an incident ticket or evidence record. |
| Filename review | Detects document-plus-executable double extensions and direction-control characters. |
| Archive inventory | Lists ZIP entries without extracting them and flags executable entries or Office macro projects. |
| Bounded static inspection | Looks for selected PDF action markers and script patterns in a limited byte window. |
| Explainable scoring | Shows the score contribution and evidence for each finding; it never claims a verdict. |
| Local reports | Exports Markdown, JSON, or self-contained HTML without cloud submission. |

## Important boundary

FileGuard **does not execute files**, detonate samples, decrypt archives, upload data, or automatically query a reputation service. A finding is a prompt for safe human review, not proof that a file is malicious. Read the full [responsible-use policy](docs/RESPONSIBLE_USE.md) before relying on the output.

## Run from source

```bash
pnpm install
pnpm dev
```

Run the deterministic test suite and generate a renderer build:

```bash
pnpm test
pnpm build
```

For a Windows desktop package, run `pnpm package:win` on Windows or use the **Windows release** workflow. The project is intentionally designed so that a Windows build can be created by GitHub Actions without handing suspicious files to an external analysis backend.

## Analysis policy

The analysis core opens selected files for reading only. It never invokes a selected file, renders a document, extracts an archive to disk, or transfers data to the network. See [Architecture](docs/ARCHITECTURE.md) for the process separation and [Responsible Use](docs/RESPONSIBLE_USE.md) for the operational guidance.

## Development status

The initial implementation focuses on Windows-oriented file types while keeping the core portable. The user interface supports Arabic right-to-left rendering and English left-to-right rendering. Release packaging is configured for Windows, and source-level analysis and reports work wherever supported Node.js and Electron are available.
