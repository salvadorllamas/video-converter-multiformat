const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getFfmpegPath: () => ipcRenderer.invoke("get-ffmpeg-path"),
    selectFolder: () => ipcRenderer.invoke("select-folder"),
    convertVideo: (options) => ipcRenderer.invoke("convert-video", options),
    cancelConversion: () => ipcRenderer.invoke("cancel-conversion"),
    onConvertProgress: (callback) => ipcRenderer.on("convert-progress", callback)
});