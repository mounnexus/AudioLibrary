class Track {
  constructor(trackPath) {
    this.track = new Audio(`${trackPath}`)
  }

  play() {
    this.track.play()
  }

  pause() {
    this.track.pause()
  }

  stop() {
    this.track.pause()
    this.track.load()
  }
}

export { Track }
