class Calculator{
  constructor(previousOperandTextEl, currentOperandTextEl){
    this.previousOperandTextEl = previousOperandTextEl
    this.currentOperandTextEl = currentOperandTextEl
    this.clear
  }

  clear(){
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  appendNumber(number){
    if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  choseOperation(operation){
    if (this.currentOperand === '') return
    if (this.previousOperand !== ''){
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = '' 
  }

  compute(){
    let computation = 0
    let prev = parseFloat(this.previousOperand)
    let current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch(this.operation){
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  updateDisplay(){
    this.currentOperandTextEl.innerText = this.currentOperand
    if (this.operation != null){
      this.previousOperandTextEl.innerText = `${this.previousOperand} ${this.operation}`
    }
    else {
      this.previousOperandTextEl.innerText = this.previousOperand
    }
  }
}



const numberButtons =document.querySelectorAll('[data-number]')
const operationButtons =document.querySelectorAll('[data-operation]')
const equalsButtons =document.querySelector('[data-equals]')
const allClearButtons =document.querySelector('[data-all-clear]')
const deleteButtons =document.querySelector('[data-delete]')
const previousOperandTextEl =document.querySelector('[data-previous-operand]')
const currentOperandTextEl =document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextEl, currentOperandTextEl)
calculator.currentOperand = ''
calculator.previousOperand = ''

numberButtons.forEach(button => {
  button.addEventListener("click" , function(){
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
  })
})

allClearButtons.addEventListener("click", button =>{
  calculator.clear()
  calculator.updateDisplay()
})

operationButtons.forEach(button => {
  button.addEventListener("click" , function(){
      calculator.choseOperation(button.innerText)
      calculator.updateDisplay()
  })
})

equalsButtons.addEventListener("click", button =>{
  calculator.compute()
  calculator.updateDisplay()
})

deleteButtons.addEventListener("click", button =>{
  calculator.delete()
  calculator.updateDisplay()
})