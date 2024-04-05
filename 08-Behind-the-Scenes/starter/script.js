'use strict';

// hoisting

// Function declaration
hoistedFunction(); // Outputs: "This function has been hoisted."

function hoistedFunction() {
  console.log('This function has been hoisted.');
}

// Function expressions
// using var
hoistedFunctionExpr(); // TypeError: hoistedFunctionExpr is not a function

var hoistedFunctionExpr = function() {
  console.log('Will this function be hoisted?');
};

// using let or const
hoistedFunctionExprLet(); // ReferenceError: Cannot access 'hoistedFunctionExprLet' before initialization

let hoistedFunctionExprLet = function() {
  console.log('Will this function be hoisted with let?');
};

// arrow funciton works the same as a function expression. depends on the var, const or let.
arrowFunction(); // TypeError: is not a function

var arrowFunction = () => {
    console.log('This arrow function has been defined.');
};