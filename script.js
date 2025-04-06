const calculatorUI = document.querySelector(".calculator");
const numBtn = document.querySelector(".button_number");
const resultBtn = document.querySelector(".button_result");
const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display");

const calculator = (function () {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return { add, sub, mul, div };
})();







































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

