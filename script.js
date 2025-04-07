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
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return { add, sub, mul, div };
})();

const clearCalc = () => {
    displayInput.textContent = '';
    displayEqual.textContent = '';
    displayResult.textContent = '';
    resultBtn.removeAttribute('disabled');
    operatorBtns.forEach((operator) => operator.removeAttribute('disabled'));
    pointBtn.removeAttribute('disabled');
}

// const getNumber = (input) => {
// }

displayInput.textContent = '';

numBtns.forEach((number) => number.addEventListener('click', (e) => {
    if (displayResult.textContent !== '') {
        clearCalc();
    }
    if (e.target === pointBtn && displayInput.textContent === '') {
        displayInput.textContent += '0';
        displayInput.textContent += '.';
        pointBtn.setAttribute('disabled', true);
    } else if (e.target === pointBtn) {
        displayInput.textContent += '.';
        pointBtn.setAttribute('disabled', true);
    } else {
        displayInput.textContent += e.target.textContent;
    }
}));

operatorBtns.forEach((operator) => operator.addEventListener('click', (e) => {
    if (displayInput.textContent !== '') {
        if (displayInput.textContent.at(-2) === '+' || displayInput.textContent.at(-2)=== '-' || displayInput.textContent.at(-2) === '*' || displayInput.textContent.at(-2) === '/') {
            displayInput.textContent = displayInput.textContent.slice(0, -2);
            displayInput.textContent += ' ' + e.target.textContent + ' ';
        } else {
            displayInput.textContent += ' ' + e.target.textContent + ' ';
        }
        pointBtn.removeAttribute('disabled');
    }
    if (displayResult.textContent !== '') {
        const result = displayResult.textContent;
        clearCalc();
        displayInput.textContent += result;
        displayInput.textContent += ' ' + e.target.textContent + ' ';
    }
}));

clearBtn.addEventListener('click', () => {
    clearCalc();
});

resultBtn.addEventListener('click', (e) => {
    displayEqual.textContent = '=';
    displayResult.textContent += 'result';
    resultBtn.setAttribute('disabled', true);
    pointBtn.removeAttribute('disabled');
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

