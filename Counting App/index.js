let startCount = 0
let count = 0
const countEl = document.getElementById("count-el") 
const saveEl = document.getElementById("save-el")
const countBtn = document.getElementById("increment-btn")
const saveBtn = document.getElementById("save-btn")
const setStartBtn = document.getElementById("set-start-btn")
const setCounterNameBtn = document.getElementById("set-counter-name")
const openPopUp =document.querySelectorAll('[data-pop-up-target]')
const closePopUp =document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById("overlay")
let setInput = document.getElementById("start-input")
const setInputBtn = document.getElementById("check-mark")

setInputBtn.addEventListener("click", function setStartInput(startCount){
  startCount = setInput.value
  setStartCount(startCount) 
  const popups =document.querySelectorAll('.pop-up.active')
   popups.forEach(popup => {
    closePopUpWindow(popup)
   })
})

function setStartCount(startCount){
  count = startCount
  countEl.textContent = count
}


countBtn.addEventListener("click", function increment(){ 
  count++ 
  countEl.textContent = count
})

saveBtn.addEventListener("click", function save(){
  if (count != 0){
    let history = " " + count 
    saveEl.textContent += history
    count = 0
    countEl.textContent = count
  }
})

overlay.addEventListener('click', () =>{
   const popups =document.querySelectorAll('.pop-up.active')
   popups.forEach(popup => {
    closePopUpWindow(popup)
   })
})
openPopUp.forEach(button => {
  button.addEventListener('click', () => {
    const popup = document.querySelector(button.dataset.popUpTarget)
    openPopUpWindow(popup)
  })
})

function openPopUpWindow(popup){
  if (popup == null) return
  popup.classList.add('active')
  overlay.classList.add('active')
}

closePopUp.forEach(button => {
  button.addEventListener('click', () =>{
    const popup = button.closest('.pop-up')
    closePopUpWindow(popup)  
  })
})

function closePopUpWindow(popup){
  if (popup == null) return
  popup.classList.remove('active')
  overlay.classList.remove('active')
}

