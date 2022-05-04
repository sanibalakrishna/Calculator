class Calculator{
    currentOperand = '';
    previousOperand='';
    // operation = undefined;
    constructor(previousOperandTextelement,currentOperandTextelement)
    {
        this.previousOperandTextelement = previousOperandTextelement;
        this.currentOperandTextelement = currentOperandTextelement;

    }
    clear()
    { this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;

    }
    delete()
    {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);

    }
    appendNumber(number)
    {  if(number=== '.' && this.currentOperand.includes('.')) return;
       this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation)
    {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '')
        {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute()
    {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation)
        {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    getDisplayNumber(number)
    { const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      const floatNumber =  parseFloat(number);
      let integerDigitsDisplay 
      if(isNaN(integerDigits))
      {
          integerDigitsDisplay = '';
      }
      else
      {
        integerDigitsDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits:0});
      }
      if(decimalDigits != null)
      {
          return `${integerDigitsDisplay}.${decimalDigits}`;
      }
      else
      {
          return integerDigitsDisplay;
      }
    }
    updateDispaly()
    {
      this.currentOperandTextelement.innerText =  this.getDisplayNumber(this.currentOperand); 
      if(this.operation != null)
      {
          this.previousOperandTextelement.innerText = `${this.previousOperand} ${this.operation}`;
      }
      else{
        this.previousOperandTextelement.innerText = '';
      }
      
    }
}



const numberButtons=document.querySelectorAll('[data-number]');
const operationButtons=document.querySelectorAll('[data-operation]');
const equalsButton=document.querySelector('[data-equals]');
const deleteButton=document.querySelector('[data-delete]');
const allClearButton=document.querySelector('[data-all-clear]');
const previousOperandTextelement= document.querySelector('[data-previous-operand]');
const currentOperandTextelement= document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextelement,currentOperandTextelement);

numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDispaly();
    })
})

operationButtons.forEach(button => {
  button.addEventListener('click',()=>{
     
      calculator.chooseOperation(button.innerText);
     
      calculator.updateDispaly();
  })
})

allClearButton.addEventListener('click',()=>{
  calculator.clear();
  calculator.updateDispaly();
})

equalsButton.addEventListener('click',()=>{
  calculator.compute();
  calculator.updateDispaly();
})

deleteButton.addEventListener('click',()=>{
  calculator.delete();
  calculator.updateDispaly();
})