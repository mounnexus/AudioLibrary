import { ipcRenderer } from "electron"
import { Track } from "track.js"

const dropZone = document.querySelector("#dropzone")

dropZone.addEventListener("dragover", (e) => {
  e.stopPropagation()
  e.preventDefault()
})

dropZone.addEventListener("drop", async (e) => {
  e.stopPropagation()
  e.preventDefault()

  const files = e.dataTransfer.files

  for (const file of files) {
    console.log(file.path)
    const filePath = file.path
    const extension = filePath.toString().substring(filePath.indexOf(".") + 1)
    console.log(extension)

    if (extension === "mp3" || extension === "wav") {
      const track = new Track(filePath)

      const musicItem = `<div class="musicItem">
      <div class="playBtn">play</div>
      <div class="pauseBtn">pause</div>
      <div class="stopBtn">stop</div>
      <div class="effectsBtn">effects</div>
    </div>`

      dropZone.innerHTML += musicItem

      document.querySelector(".playBtn").addEventListener("click", () => {
        track.play()
      })
      document.querySelector(".pauseBtn").addEventListener("click", () => {
        track.pause()
      })
      document.querySelector(".stopBtn").addEventListener("click", () => {
        track.stop()
      })

      document.querySelector(".effectsBtn").addEventListener("click", () => {
        /*    window.api.effectsWindowOpened("item:effectsWindowOpened")
        ipcRenderer.on("item:effectsWindowOpened", (e, data) => {
          if (data) {
            window.api.effectsWindow("item:effectsWindow")
          }
        }) */
      })
    } else {
      dropZone.innerHTML += `<img width="400px" height="400px" src="${filePath}">`
    }

    const isFile = await window.api.isFile(filePath)
    console.log(file, isFile)
  }
})

/* function createTrack(filePath) {
  return new Audio(`${filePath}`)
}

const playTrack = (track) => {
  track.play()
}

const pauseTrack = (track) => {
  track.pause()
}

const stopTrack = (track) => {
  track.pause()
  track.load()
}
 */
