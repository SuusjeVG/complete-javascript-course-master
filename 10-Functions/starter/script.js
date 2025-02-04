'use strict';

<<<<<<< HEAD

const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
}

console.log(oneWord('Hello World susan'));
=======
const greet = (greeting) => {
    return (name) => {
        console.log(`${greeting}, ${name}`);
    }
}
let greetHallo = greet('Hello');
greetHallo('John');
greetHallo('Jane');
greetHallo('Tom');

// greet('Hello')('John');

// html elements
// const $inputOne = document.querySelector('#first-number');
// const $inputTwo = document.querySelector('#second-number');
// const $result = document.querySelector('.result');
// const $btn = document.querySelector('.btn');

// $btn.addEventListener('click', function () {
//     let numberOne = parseInt($inputOne.value.trim());
//     let numberTwo = parseInt($inputTwo.value.trim());

//     let substract = numberTwo - numberOne + 1;

//     if (isNaN(numberOne) || isNaN(numberTwo)) {
//         $result.innerText = 'Please enter a number';
//         return;
//     };

//     if (numberOne >= numberTwo) {
//         $result.innerText = 'Please enter a number greater than the first number';
//         return;
//     };

//     let randomNumber = Math.floor(Math.random() * substract + numberOne);
    
//     $result.innerText = randomNumber;
// });


>>>>>>> 7168b92b8b875dafbf3b1bc34e4f629600b6a0c7
