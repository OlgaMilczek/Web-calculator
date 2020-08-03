const operators = {'+': 'add', '-':'subtract', '*':'multiply', '/':'divide',};
const numberButtons = document.querySelectorAll('.number-button'); 
const actionButtons = document.querySelectorAll('.action-button'); 
let delButton = document.querySelector('#del');
let acButton = document.querySelector('#ac');
let equalButton = document.querySelector('.equal-button');
let currentInput = document.querySelector('.curr-input');
let prevInput = document.querySelector('.prev-input');
let numberOfActions = 0;
let numbers = [];
let operator;
let comma = false;
let PREC = 100000;

numberButtons.forEach(numberButton => numberButton.addEventListener('click', fillDisplayNumbers));
actionButtons.forEach(actionButton => actionButton.addEventListener('click', fillDisplayAction));
equalButton.addEventListener('click', takeAction);
delButton.addEventListener('click', deleteLast);
acButton.addEventListener('click', deleteAll);

function add(num1, num2) {
	return matchRound((num1 + num2), PREC);
}

function subtract(num1, num2) {
	return matchRound((num1-num2), PREC);
}

function multiply(num1, num2) {
    return matchRound((num1*num2), PREC);
}

function divide(num1, num2) {
    if (num2 === 0) {
        deleteAll()
        return alert('Can\'t divide by zero');
    }
    return matchRound((num1/num2), PREC);
}

function operate(operator, num1, num2) {
    switch(operator) {
        case '+': 
            return add(num1,num2);
        case '-':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '÷':
            return divide(num1, num2);
        default:
            Error('Wrong oparator')
    }
}

function fillDisplayNumbers(e) {
    let inputNumber = this.textContent;
    if (inputNumber === '.') {
        if (comma === false) {
        comma = true;
        }
        else {
            return;
        }
    }
    currentInput.textContent = currentInput.textContent + inputNumber;

}

function fillDisplayAction(e) {
    let inputArray = prevInput.textContent.trimEnd().split(' ')
    let lenght = inputArray.length;
    comma = false;
    if (currentInput.textContent === '') {
        if (inputArray[lenght-1] === '+' || inputArray[lenght-1] === '-' || inputArray[lenght-1] === '÷' ||  inputArray[lenght-1] === '×') {
            inputArray[lenght-1] = this.textContent;
            operator = this.textContent;
            prevInput.textContent = inputArray.join(' ');
            return;
        }
    }
    else {
        numbers.push(Number(currentInput.textContent))
        currentInput.textContent = '';
        numberOfActions += 1;
        if (numberOfActions === 2) {
            let num1 = numbers[0];
            let num2 = numbers[1];
            let result =  operate(operator, num1, num2);
            prevInput.textContent = result.toString() +' '+ this.textContent;
            operator = this.textContent;
            numbers.pop()
            numbers.pop()
            numberOfActions -= 1;
            numbers.push(result);
        }
        else {
            operator = this.textContent;
            prevInput.textContent = numbers[0] +' '+ this.textContent;
        }
    }
}

function takeAction() {
    if (operator === '=') {
        return;
    }
    prevInput.textContent = prevInput.textContent+' '+currentInput.textContent;
    numbers.push(Number(currentInput.textContent));
    let num1 = numbers[0];
    let num2 = numbers[1];
    let result = operate(operator, num1, num2);
    numbers.pop()
    numbers.pop()
    currentInput.textContent = result;
    numberOfActions = 0;
    operator = '=';
}

function deleteAll() {
    currentInput.textContent = '';
    prevInput.textContent = '';
    numbers = [];
    operator = '';
    numberOfActions = 0;
}

function deleteLast() {
    let inputArray = currentInput.textContent.trimEnd().split('');
    inputArray.pop();
    currentInput.textContent = inputArray.join('');
}

function matchRound(num, prec) {
    return Math.floor(num * prec) / prec;
}

