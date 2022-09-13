const { contextBridge, ipcRenderer } = require("electron")

/* contextBridge.exposeInMainWorld("electron", {
  startDrag: (fileName) => {
    ipcRenderer.send("ondragstart", fileName)
  },
}) */

const api = {
  isFile: (path) => ipcRenderer.invoke("is-file", path),
  effectsWindow: (utility) => ipcRenderer.send(`${utility}`),
  effectsWindowOpened: (data) => ipcRenderer.send(`${data}`),
}

const titleBarUtility = {
  useTitleBar: (utility) => ipcRenderer.send(`${utility}`),
}

contextBridge.exposeInMainWorld("api", api)
contextBridge.exposeInMainWorld("titleBarUtility", titleBarUtility)
