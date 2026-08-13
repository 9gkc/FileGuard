const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("fileguard", {
  pickFiles: () => ipcRenderer.invoke("fileguard:pick-files"),
  analyze: (filePaths) => ipcRenderer.invoke("fileguard:analyze", filePaths),
  saveReport: (analysis, format, locale) => ipcRenderer.invoke("fileguard:save-report", analysis, format, locale),
  showInFolder: (filePath) => ipcRenderer.invoke("fileguard:show-in-folder", filePath),
});
