"use strict"
const inputModal = document.querySelector("#input-modal")
// const inputArea = document.querySelector(".projects-input input")

if(document.querySelector("#add-button")) {
document.querySelector("#add-button").addEventListener("click", () => {
  inputModal.classList.add("active")
  document.querySelector(".projects-input input").focus()
})


inputModal.addEventListener("click", e => {
  if(e.target !== e.currentTarget)
  return
  inputModal.classList.remove("active")
})
}
