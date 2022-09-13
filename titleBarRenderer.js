const titleBarIcons = document.querySelectorAll("[data-icon]")

titleBarIcons.forEach((item) => {
  const data = item.getAttribute("data-icon")

  item.addEventListener("click", () => {
    console.log("clicked")
    window.titleBarUtility.useTitleBar(data)
  })
})
