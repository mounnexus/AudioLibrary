const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
const { lstatSync } = require("fs")
let mainWindow
let effectsWindow

//MAINWINDOW
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

  mainWindow.on("closed", () => {
    app.quit()
  })
}

// EFFECTS WINDOW
const createEffectsWindow = () => {
  effectsWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    /* 
    frame: false,
    autoHideMenuBar: true, */
  })

  effectsWindow.loadFile("effectsWindow.html")

  effectsWindow.on("close", () => {
    effectsWindow = null
  })
}

//CHECK IF IT IS A FILE OR A FOLDER
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
//EFFECTSWINDOW EVENT
ipcMain.on("item:effectsWindow", (e) => {
  console.log("bruuhhhh so many effects")
  createEffectsWindow()
  effectsWindow.focus()
})
/* 
ipcMain.on("item:effectsWindowOpened", (e, data) => {
  if (effectsWindow) {
    mainWindow.webContents.send(true)
  } else {
    mainWindow.webContents.send(false)
  }
})
 */
ipcMain.on("item:data", (e, data) => {
  console.log(data)
})

//TITLEBAR EVENTS
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
