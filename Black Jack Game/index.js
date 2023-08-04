let player={
  name:"abc",
  chips: 200
}

let card = []
let sum = 0 
let hasBlack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

function startGame(){
  isAlive = true
  let firstCard = getRandomCard()
  let secondCard = getRandomCard()
  card = [firstCard, secondCard]
  sum = firstCard + secondCard

  renderGame()
}

function getRandomCard(){
  let randomnumber = Math.floor(Math.random() * 13) + 1
  if (randomnumber === 1){
    return 11
  }
  else if (randomnumber > 10 ){
    return 10}
  else{
    return randomnumber
  }
}

function renderGame(){
  sumEl.textContent = "Sum: " + sum
  cardEl.textContent = "Cards: "
  for (let i = 0 ; i < card.length ; i++){
    cardEl.textContent += card[i] + " "
  }
  if(sum <= 20){
    message = "Do you want to draw a new card?"
  }
  else if (sum === 21){
    message = "You got Black Jack!"
    hasBlack = true
  }
  else {
    message = "You are out of the game!"
    isAlive = false
  }
  messageEl.textContent = message
}

function newCard(){
  if (isAlive === true && hasBlack === false){
    let newcard = getRandomCard()
    sum += newcard
    card.push(newcard)
    renderGame()
  }

}