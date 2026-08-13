const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
const fs = require("node:fs/promises");
const path = require("node:path");
const { analyzeFile } = require("../src/core/analyzer.cjs");
const { createReport } = require("../src/core/reports.cjs");
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({ width: 1320, height: 860, minWidth: 980, minHeight: 680, backgroundColor: "#0b1020", title: "FileGuard", webPreferences: { preload: path.join(__dirname, "preload.cjs"), contextIsolation: true, nodeIntegration: false, sandbox: true } });
  const devUrl = process.env.VITE_DEV_SERVER_URL;
  if (devUrl) mainWindow.loadURL(devUrl); else mainWindow.loadFile(path.join(__dirname, "..", "dist", "index.html"));
}
app.whenReady().then(() => {
  ipcMain.handle("fileguard:pick-files", async () => { const result = await dialog.showOpenDialog(mainWindow, { title: "Select files for safe local triage", properties: ["openFile", "multiSelections"] }); return result.canceled ? [] : result.filePaths; });
  ipcMain.handle("fileguard:analyze", async (_event, filePaths) => { if (!Array.isArray(filePaths) || filePaths.length > 20) throw new Error("FileGuard accepts between 1 and 20 files per analysis."); return Promise.all(filePaths.map((filePath) => analyzeFile(filePath))); });
  ipcMain.handle("fileguard:save-report", async (_event, analysis, format, locale) => { const content = createReport(analysis, format, locale); const extension = format === "markdown" ? "md" : format; const result = await dialog.showSaveDialog(mainWindow, { title: "Export FileGuard report", defaultPath: `fileguard-${analysis.fileName.replace(/[^a-z0-9._-]/gi, "_")}.${extension}`, filters: [{ name: format.toUpperCase(), extensions: [extension] }] }); if (result.canceled || !result.filePath) return { saved: false }; await fs.writeFile(result.filePath, content, "utf8"); return { saved: true, path: result.filePath }; });
  ipcMain.handle("fileguard:show-in-folder", async (_event, filePath) => shell.showItemInFolder(filePath));
  createWindow(); app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
