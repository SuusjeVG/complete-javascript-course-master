'use strict';

// const oneWord = function (str) {
//     return str.replace(/ /g, '').toLowerCase();
// }

// console.log(oneWord('Hello World susan'));
// const greet = (greeting) => {
//     return (name) => {
//         console.log(`${greeting}, ${name}`);
//     }
// }
// let greetHallo = greet('Hello');
// greetHallo('John');
// greetHallo('Jane');
// greetHallo('Tom');

// greet('Hello')('John');

// Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVAT = addTax.bind(null, 0.23);
// // addVAT = value => value + value * 0.23;

// console.log(addVAT(100));
// console.log(addVAT(23));

// // wright a function that returns a function that does the same as the addVat function 
// const addTaxTwo = (rate) => {
//     return (value) => {
//         return value + value * rate 
//     }
// }
// const addVat2 = addTaxTwo(0.23)
// console.log(addVat2(200))


/*****
 * Coding CHallenge 1
 *****/

// Let's build a simple poll app!
// A poll has a question, an array of options from which people can choose, and an
// array with the number of replies for each option. This data is stored in the starter
// 'poll' object below.
// Your tasks:
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The
// method does 2 things:
// 1.1. Display a prompt window for the user to input the number of the
// selected option. The prompt should look like this:
// What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)
// 1.2. Based on the input number, update the 'answers' array property. For
// example, if the option is 3, increase the value at position 3 of the array by
// 1. Make sure to check if the input is a number and if the number makes
// sense (e.g. answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The
// method takes a string as an input (called 'type'), which can be either 'string'
// or 'array'. If type is 'array', simply display the results array as it is, using
// console.log(). This should be the default option. If type is 'string', display a
// string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each
// 'registerNewAnswer' method call.
// 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
// data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
// object! So what should the this keyword look like in this situation?

const pollButton = document.querySelector('.poll');

const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0),

    registerNewAnswer() {

        // tip use join and \n
        const answer = parseInt(prompt(`${this.question}\n\n ${this.options[0]}, \n ${this.options[1]}, \n ${this.options[2]}, \n${this.options[3]}\n\n (Write option number) `
        ))

        if (typeof answer === 'number' && answer < this.answers.length ) {
            this.answers[answer]++
            this.displayResults()
            this.displayResults('string')
        } else {
            alert('Your answer is not in between 0 and 3')
        }

        // switch (answer) {
        //     case 0:
        //         this.answers[0] += 1
        //     break;
        //     case 1:
        //         this.answers[1] += 1
        //     break;
        //     case 2:
        //         this.answers[2] += 1
        //     break;
        //     case 3:
        //         this.answers[3] += 1
        //     break;
        //     default: 
        //         alert('Your answer is not in between 0 and 3')
        // }


    },

    displayResults(type = 'array') {

        if (type === "array") {
            console.log(this.answers);
        } else if (type === 'string') {
            console.log(`Poll results are ${this.answers.join(', ')}`);
        }
    }
}

pollButton.addEventListener('click', poll.registerNewAnswer.bind(poll))


// Bonus
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });

// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]

/*****
 * Coding CHallenge 2
 *****/
// This is more of a thinking challenge than a coding challenge �
// Your tasks:
// 1. Take the IIFE below and at the end of the function, attach an event listener that
// changes the color of the selected h1 element ('header') to blue, each time
// the body element is clicked. Do not select the h1 element again!
// 2. And now explain to yourself (or someone around you) why this worked! Take all
// the time you need. Think about when exactly the callback function is executed,
// and what that means for the variables involved in this example.

(function() {
    const header = document.querySelector('h1');
    header.style.color = "red";

    document.body.addEventListener('click', () => {
        header.style.color = 'blue';
    })
})()

// IIFE voert de functie 1 malig uit, maar er zit een click event in met een callback functie die pas uitgevoerd wordt op het moment dat je op de body klikt. Dus deze functie werkt omdat hij uitgevoerd is dus heeft hij de event listener aan de body toegevoegd en deze aparte functie kan nog steeds uitgevoerd worden omdat deze opdracht al gegeven is. Een callback wordt pas uitgevoerd als de actie goed is.Denk ook aan de closure




// ======================================================================
// extra for my own randomizer
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







