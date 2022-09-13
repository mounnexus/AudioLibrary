const { contextBridge, ipcRenderer } = require("electron")

/* contextBridge.exposeInMainWorld("electron", {
  startDrag: (fileName) => {
    ipcRenderer.send("ondragstart", fileName)
  },
}) */

const api = {
  isFile: (path) => ipcRenderer.invoke("is-file", path),
}

const titleBarUtility = {
  useTitleBar: (utility) => ipcRenderer.send(`${utility}`),
}

contextBridge.exposeInMainWorld("api", api)
contextBridge.exposeInMainWorld("titleBarUtility", titleBarUtility)
