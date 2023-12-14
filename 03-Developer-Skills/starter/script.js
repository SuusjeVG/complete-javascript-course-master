// Remember, we're gonna use strict mode in all scripts now!
"use strict";

///////////////////////////////////////
// Using Google, StackOverflow and MDN

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what do do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

// PROBLEM 2:
// Function should now receive 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? NO! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== "number") continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};
const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);

/////////////////////////////////////////////
// Debugging with the Console and Breakpoints
// const object = {
//   value: 10,
//   name: "John",
//   age: 20,
// };
// console.table(object);

/*******************************
 * Developer Skills & Editor Setup
 *********************************/
//////////////////////
// Coding Challenge #1
// Given an array of forecasted maximum temperatures, the thermometer displays a
// string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1
// days ... 21ºC in 2 days ... 23ºC in 3 days ..."
// Your tasks:
// 1. Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console. Try it with both test datasets.
// 2. Use the problem-solving framework: Understand the problem and break it up
// into sub-problems!
// Test data:
// § Data 1: [17, 21, 23]
// § Data 2: [12, 5, -5, 0, 4]

// PROBLEM:

// 1) Understanding the problem
// - What does forecacsted tempratures mean? Answer: it means the remprature wich is about to come in the upcoming days.
// - How to print an array with multple outcomes? Answer: with a for loop

// 2) Breaking up into sub-problems (tasks)
// - Create a function with a arr parameter to callback to the array.
// - Make a for loop in the function to loop and print multiple lines of the upcoming tempratures.
// - print the lines into 1 string

// Research on Google with the sub-problem questions (MDN, StackOverflow, etc.)

const temperature_array = [17, 21, 23];

function printForecast(arr) {
  let string = "... ";
  for (let i = 0; i < arr.length; i++) {
    string = string + `${arr[i]}ºC in ${i + 1} days ... `;
  }
  console.log(string);
}

printForecast(temperature_array);

// PROBLEM:

// 1) Understanding the problem
// - What is .....?
// - How to ....?

// 2) Breaking up into sub-problems (tasks)
// - Tasks you need to do to solve the problem

// 3) Research on Google with the sub-problem questions (MDN, StackOverflow, etc.)
