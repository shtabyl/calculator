const calculatorUI = document.querySelector('.calculator');

const buttons = document.querySelectorAll('.button');
const numBtns = document.querySelectorAll('.button_number');
const operatorBtns = document.querySelectorAll('.button_operator');
const resultBtn = document.querySelector('.button_result');

const display = document.querySelector('.display');
const displayInput = document.querySelector('.display__input');
const displayEqual = document.querySelector('.display__equal');
const displayResult = document.querySelector('.display__result');
const num1 = document.querySelector('#num1');
const operator = document.querySelector('#operator');
const num2 = document.querySelector('#num2');

const clearBtn = document.querySelector('.button_clear');
const pointBtn = document.querySelector('.button_point');


const calculator = (function () {
    const add = (a, b) => parseFloat(a) + parseFloat(b);
    const sub = (a, b) => parseFloat(a) - parseFloat(b);
    const mul = (a, b) => parseFloat(a) * parseFloat(b);
    const div = (a, b) => parseFloat(a) / parseFloat(b);
    return { add, sub, mul, div };
})();

const clearCalc = () => {
    num1.textContent = '';
    num2.textContent = '';
    operator.textContent = '';
    displayEqual.textContent = '';
    displayResult.textContent = '';
    resultBtn.removeAttribute('disabled');
    operatorBtns.forEach((operator) => operator.removeAttribute('disabled'));
    pointBtn.removeAttribute('disabled');
}

const getNumber = (input, num) => {
    if (input === pointBtn && num.textContent === '') {
        num.textContent += '0.';
        pointBtn.setAttribute('disabled', true);
    } else if (input === pointBtn) {
        num.textContent += '.';
        pointBtn.setAttribute('disabled', true);
    } else {
        num.textContent += input.textContent;
    }
}

numBtns.forEach((number) => number.addEventListener('click', (e) => {
    if (displayResult.textContent !== '') {
        clearCalc();
    }
    if (operator.textContent === '') {
        getNumber(e.target, num1);
    } else {
        getNumber(e.target, num2);
    }
}));

operatorBtns.forEach((operatorBtn) => operatorBtn.addEventListener('click', (e) => {
    if (num1.textContent !== '') {
        if (operator.textContent === '+' 
        || operator.textContent === '-' 
        || operator.textContent === '*' 
        || operator.textContent === '/') {
            operator.textContent = '';
            operator.textContent += e.target.textContent;
        } else {
            operator.textContent += e.target.textContent;
        }
        pointBtn.removeAttribute('disabled');
    }
    if (displayResult.textContent !== '') {
        const currentResult = displayResult.textContent;
        clearCalc();
        num1.textContent += currentResult;
        operator.textContent += e.target.textContent;
    }
}));

clearBtn.addEventListener('click', () => {
    clearCalc();
});

resultBtn.addEventListener('click', (e) => {
    displayEqual.textContent = '=';
    resultBtn.setAttribute('disabled', true);
    pointBtn.removeAttribute('disabled');
    switch (operator.textContent) {
        case '+':
            displayResult.textContent = calculator.add(num1.textContent, num2.textContent);
            break;
        case '-':
            displayResult.textContent = calculator.sub(num1.textContent, num2.textContent);
            break;
        case '*':
            displayResult.textContent = calculator.mul(num1.textContent, num2.textContent);
            break;
        case '/':
            if (num2.textContent !== '0') {
                displayResult.textContent = calculator.div(num1.textContent, num2.textContent);
            } else {
                displayResult.textContent = 'Error';
                operatorBtns.forEach((operator) => operator.setAttribute('disabled', true));
            }
            break;
    }
});












// Parser for more complex input
// const calcParser = (arr) => {
//     let sum = parseFloat(arr[0]);
//     for (let i = 0; i < arr.length - 1; i++) {
//         if (arr[i] === '+') {
//             sum = calculator.add(sum, parseFloat(arr[i + 1]));
//             console.log(sum);
//         }
//         if (arr[i] === '-') {
//             sum = calculator.sub(sum, parseFloat(arr[i + 1]));
//             console.log(sum);
//         }
//         if (arr[i] === '*') {
//             sum = calculator.mul(sum, parseFloat(arr[i + 1]));
//             console.log(sum);
//         }
//         if (arr[i] === '/') {
//             sum = calculator.div(sum, parseFloat(arr[i + 1]));
//             console.log(sum);
//         }
//     }
//     return sum;
// }

