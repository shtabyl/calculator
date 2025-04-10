const calculatorUI = document.querySelector('.calculator');

const buttons = document.querySelectorAll('.button');
const numBtns = document.querySelectorAll('.button_number');
const operatorBtns = document.querySelectorAll('.button_operator');
const resultBtn = document.querySelector('.button_result');

const display = document.querySelector('.display');
const displayInput = document.querySelector('.display__input');
const displayNumSecondRow = document.querySelector('.display__num_second-row');
const displayEqual = document.querySelector('.display__equal');
const displayResult = document.querySelector('.display__result');
const num1 = document.querySelector('#num1');
const operator = document.querySelector('#operator');
const num2 = document.querySelector('#num2');

const clearBtn = document.querySelector('.button_clear');
const pointBtn = document.querySelector('.button_point');
const percentBtn = document.querySelector('.button_percent');
const negativeBtn = document.querySelector('.button_negative');
const backspaceBtn = document.querySelector('.button_backspace');


const calculator = (function () {
    const add = (a, b) => parseFloat(a) + parseFloat(b);
    const sub = (a, b) => parseFloat(a) - parseFloat(b);
    const mul = (a, b) => parseFloat(a) * parseFloat(b);
    const div = (a, b) => parseFloat(a) / parseFloat(b);
    return { add, sub, mul, div };
})();

const clearCalc = () => {
    num1.textContent = '';
    num1.style.display = 'none';
    num2.textContent = '';
    num2.style.display = 'none';
    operator.textContent = '';
    operator.style.display = 'none';
    displayEqual.textContent = '';
    displayResult.textContent = '';
    resultBtn.setAttribute('disabled', true);
    operatorBtns.forEach((operator) => operator.removeAttribute('disabled'));
    pointBtn.removeAttribute('disabled');
    moveNum2Back();
    backspaceBtn.removeAttribute('disabled');
}

const getNumber = (input, num) => {
    if (input === pointBtn && num.textContent === '') {
        num.style.display = 'inline';
        num.textContent += '0.';
        pointBtn.setAttribute('disabled', true);
    } else if (input === pointBtn) {
        num.style.display = 'inline';
        num.textContent += '.';
        pointBtn.setAttribute('disabled', true);
    } else {
        num.style.display = 'inline';
        num.textContent += input.textContent;
    }
}

const returnPercent = (num) => {
    if (num.textContent !== '') {
        num.textContent = num.textContent / 100;
    }
}


percentBtn.addEventListener('click', () => {
    if (operator.textContent === '') {
        returnPercent(num1);
    } else {
        returnPercent(num2);
    }
})

numBtns.forEach((number) => number.addEventListener('click', (e) => {
    if (displayResult.textContent !== '') {
        clearCalc();
    }
    if (operator.textContent === '') {
        getNumber(e.target, num1);
    } else {
        getNumber(e.target, num2);
        operatorBtns.forEach((operator) => operator.setAttribute('disabled', true));
        resultBtn.removeAttribute('disabled');
    }
    backspaceBtn.removeAttribute('disabled');
}));

operatorBtns.forEach((operatorBtn) => operatorBtn.addEventListener('click', (e) => {
    if (num1.textContent !== '') {
        if (operator.textContent) {
            operator.textContent = '';
            operator.textContent += e.target.textContent;
            operator.style.display = 'inline';
        } else {
            operator.textContent += e.target.textContent;
            operator.style.display = 'inline';
        }
        pointBtn.removeAttribute('disabled');
    }
    if (displayResult.textContent !== '') {
        const currentResult = displayResult.textContent;
        clearCalc();
        num1.style.display = 'inline';
        num1.textContent += currentResult;
        operator.style.display = 'inline';
        operator.textContent += e.target.textContent;
    }
    moveNum2();
    backspaceBtn.removeAttribute('disabled');
}));

clearBtn.addEventListener('click', () => {
    clearCalc();
});

resultBtn.addEventListener('click', (e) => {
    displayEqual.style.display = 'inline';
    displayEqual.textContent += '=';
    resultBtn.setAttribute('disabled', true);
    pointBtn.removeAttribute('disabled');
    operatorBtns.forEach((operator) => operator.removeAttribute('disabled'));
    backspaceBtn.setAttribute('disabled', true);
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

backspaceBtn.addEventListener('click', () => {
    if (num1.textContent !== '' && operator.textContent === '') {
        num1.textContent = num1.textContent.slice(0, num1.textContent.length - 1);
        if (num1.textContent === '') {
            num1.style.display = 'none';
        }
    } else if (displayResult.textContent === '') {
        num2.textContent = num2.textContent.slice(0, num2.textContent.length - 1);
        if (num2.textContent === '') {
            num2.style.display = 'none';
            resultBtn.setAttribute('disabled', true);
        }
    }
})

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Delete' || e.key.charCodeAt() === 67 && e.key !== 'Enter') {
        clearCalc();
    }
    if (e.key === 'Enter' || e.key === '=' || e.key.charCodeAt() === 61) {
        resultBtn.click();
    }
    if (e.key === '.') {
        pointBtn.click();
    }
    if (e.key >= '0' && e.key <= '9') {
        numBtns.forEach((number) => {
            if (number.textContent === e.key) {
                number.click();
            }
        });
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        operatorBtns.forEach((operator) => {
            if (operator.textContent === e.key) {
                operator.click();
            }
        });
    }
});

// Overflow display
const moveNum2 = () => {
    if (num1.clientWidth > display.clientWidth * 0.6) {
        if (num2.parentElement === displayInput) {
            const elemToRemove = displayInput.removeChild(num2);
            displayNumSecondRow.insertBefore(elemToRemove, displayEqual);
        }
    }
}

const moveNum2Back = () => {
    if (num2.parentElement === displayNumSecondRow) {
        const elemToRemove = displayNumSecondRow.removeChild(num2);
        displayInput.appendChild(elemToRemove);
    }
}


