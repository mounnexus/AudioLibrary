const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
const { lstatSync } = require("fs")
let mainWindow
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    frame: false,
    autoHideMenuBar: true,
  })

  mainWindow.loadFile("index.html")
}

ipcMain.handle("is-file", async (_, path) => {
  return lstatSync(path).isFile()
})

app.whenReady().then(() => {
  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

ipcMain.on("item:data", (e, data) => {
  console.log(data)
})

ipcMain.on("minimize", () => {
  mainWindow.minimize()
})

ipcMain.on("maximize", () => {
  if (!mainWindow.isMaximized()) {
    mainWindow.maximize()
    return
  }
  mainWindow.restore()
})

ipcMain.on("close", () => {
  mainWindow.close()
})
