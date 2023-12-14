/*****************************
LECTURE: Values and Variables
*****************************/
/* 
1. Declare variables called 'country', 'continent' and 'population' and 
assign their values according to your own country (population in millions)
2. Log their values to the console 
*/

let country = "Netherlands";
let continent = "Europe";
let population = "18000000";

console.log(country);
console.log(continent);
console.log(population);

/*******************
LECTURE: Data Types
********************/
/* 
1. Declare a variable called 'isIsland' and set its value according to your 
country. The variable should hold a Boolean value. Also declare a variable
'language', but don't assign it any value yet
2. Log the types of 'isIsland', 'population', 'country' and 'language'
to the console
*/

let isIsland = "Netherlands"; //string
isIsland = false; // boolean
let population_couontry; //undefined

console.log(isIsland);
console.log(population_couontry);

/****************************
LECTURE: let, const and var
****************************/
/* 
1. Set the value of 'language' to the language spoken where you live (some 
countries have multiple languages, but just choose one)
2. Think about which variables should be const variables (which values will never 
change, and which might change?). Then, change these variables to const.
3. Try to change one of the changed variables now, and observe what happens
*/
const language = "dutch";
// language = 'german'
let age = 21;
age = 22;
console.log(language);
console.log(age);

/*************************
LECTURE: Basic Operators
**************************/
/* 
1. If your country split in half, and each half would contain half the population, 
then how many people would live in each half? */
let half_population = population / 2; // 9000000

/* 2. Increase the population of your country by 1 and log the result to the console */
half_population++; // 9000001
console.log(half_population);

/* 3. Finland has a population of 6 million. Does your country have more people than 
Finland? */
const finland_population = 6000000;
console.log(population > finland_population); //true

/* 4. The average population of a country is 33 million people. Does your country 
have less people than the average country? */
const average_population = 33000000;
console.log(population < average_population); //true

/* 5. Based on the variables you created, create a new variable 'description'
which contains a string with this format: 'Portugal is in Europe, and its 11 million 
people speak portuguese' */
let description =
  "Portugal is in Europe, and its 11 million people speak portuguese";

/********************
 * Coding Challenge #1
 *********************/
// Mark and John are trying to compare their BMI (Body Mass Index), which is
// calculated using the formula:
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg
// and height in meter).

// 1. Store Mark's and John's mass and height in variables called massMark, heightMark, massJohn and heightJohn.
const mass_mark = 78;
const height_mark = 1.69;

const mass_john = 92;
const height_john = 1.95;

// 2. Calculate both their BMIs using the formula, and store the results in two variables called BMIMark and BMIJohn.
const bmi_mark = mass_mark / (height_mark * height_mark);
const bmi_john = mass_john / (height_john * height_john);

// 3. Log the value of BMIMark and BMIJohn to the console.
console.log(bmi_mark, bmi_john);

// BONUS: Create a boolean variable markHigherBMI containing information about whether Mark has a higher BMI than John. Log it to the console too
const mark_higher_BMI = bmi_mark > bmi_john;
console.log(mark_higher_BMI);

// EXTRA: Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
// m tall.

/*******************************************
 * LECTURE: Strings and Template Literals
 *******************************************/
// 1. Recreate the 'description' variable from the last assignment, this time
// using the template literal syntax
description = `Portugal is in Europe, and its 11 million people speak portuguese`;
console.log(description, "💕"); //windows + . button for emoji panel

/**************************************************
 * LECTURE: Taking Decisions: if / else Statements
 *************************************************/
// 1. If your country's population is greater than 33 million, log a string like this to the
// console: 'Portugal's population is above average'. Otherwise, log a string like
// 'Portugal's population is 22 million below average' (the 22 is the average of 33
// minus the country's population)
// 2. After checking the result, change the population temporarily to 13 and then to
// 130. See the different results, and set the population back to origina
if (population > average_population) {
  console.log("Your population is above average");
} else {
  console.log(
    `Your population is ${average_population - population} below average`
  );
}

/********************
 * Coding Challenge #2
 *********************/
// 1. Print a nice output to the console, telling the user who has the higher BMI. The message can be either:
// "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!".
if (bmi_mark > bmi_john) {
  console.log(`Mark's BMI (${bmi_mark}) is higher than John's (${bmi_john})!`);
} else {
  console.log(`John's BMI (${bmi_john}) is higher than John's (${bmi_mark})!`);
}

/***************************************
 * LECTURE: Type Conversion and Coercion
 ***************************************/
// 1. Predict the result of these 5 operations without executing them:
let n = "9" - "5"; // 4
n = "19" - "13" + "17"; //617
n = "19" - "13" + 17; //23
n = "123" < 57; //false
n = 5 + 6 + "4" + 9 - 4 - 2; //1143
// 2. Execute the operations to check if you were right

/***************************************
 * LECTURE: Equality Operators: == vs. ===
 ***************************************/
// 1. Declare a variable 'numNeighbours' based on a prompt input like this:
// prompt('How many neighbour countries does your country
// have?');
const num_neighbours = Number(
  prompt("How many neighbour countries does your country have?")
);
console.log(num_neighbours);
// 2. If there is only 1 neighbour, log to the console 'Only 1 border!' (use loose equality
// == for now)
// 3. Use an else-if block to log 'More than 1 border' in case 'numNeighbours'
// is greater than 1
// 4. Use an else block to log 'No borders' (this block will be executed when
// 'numNeighbours' is 0 or any other value)
if (num_neighbours === 1) {
  console.log("Only one border");
} else if (num_neighbours > 1) {
  console.log("More then one borders");
} else {
  console.log("No borders");
}
// 5. Test the code with different values of 'numNeighbours', including 1 and 0.
// 6. Change == to ===, and test the code again, with the same values of
// 'numNeighbours'. Notice what happens when there is exactly 1 border! Why
// is this happening?
// 7. Finally, convert 'numNeighbours' to a number, and watch what happens now
// when you input 1
// 8. Reflect on why we should use the === operator and type conversion in this
// situation
/**************
 * You should always use the === because the = has many rules so it will give you more buggs.
 * But what the == (lose equality operator coercion(type coercion)) dwingt om hetzelfde type te worden/moeten zijn.
 * hoeft niet hetzelfde data type te zijn.
 * into a number '1' == 1. With === (strict equality operator coercion(no type coercion)). dwingt niet om
 * hetzelfde te moeten zijn dus dan werkt het niet. het moet hetzelfded datatype zijn.
 **************/

/****************************
 * LECTURE: Logical Operators
 ****************************/
// 1. Comment out the previous code so the prompt doesn't get in the way
// 2. Let's say Sarah is looking for a new country to live in. She wants to live in a
// country that speaks english, has less than 50 million people and is not an
// island.
const my_country = "The Netherlands";
const my_languege = "Dutch"; //if i change this to english my country is suited
const my_population = 18000000;
const my_country_island = false;
// 3. Write an if statement to help Sarah figure out if your country is right for her.
// You will need to write a condition that accounts for all of Sarah's criteria. Take
// your time with this, and check part of the solution if necessary.
if (my_languege === "Egnlish" && my_population < 50000000 && my_country_island) {
  console.log(`My country ${my_country} is well suited for you to live in`);
} else {
  console.log(`My country ${my_country} is not what you are looking for`);
}
// 4. If yours is the right country, log a string like this: 'You should live in Portugal :)'. If
// not, log 'Portugal does not meet your criteria :('
// 5. Probably your country does not meet all the criteria. So go back and temporarily
// change some variables in order to make the condition true (unless you live in
// Canada :D)

/**********************
 * Coding Challenge #3
 **********************/
// There are two gymnastics teams, Dolphins and Koalas. They compete against each 
// other 3 times. The winner with the highest average score wins a trophy!
// Your tasks:
// 1. Calculate the average score for each team, using the test data below
// 2. Compare the team's average scores to determine the winner of the competition, 
// and print it to the console. Don't forget that there can be a draw, so test for that 
// as well (draw means they have the same average score)
// 
// GOOD LUCK 

// const score_dolphins = (96 + 108 + 89) / 3;
// const score_koalas = (88 + 91 + 110) / 3;
// console.log(score_dolphins, score_koalas);

// if (score_dolphins > score_koalas) {
//   console.log(`Dolphins win the trophy ❤`);
// } else if (score_koalas > score_dolphins) {
//   console.log(`Koalas win the trophy ❤`);
// } else if (score_dolphins === score_koalas) {
//   console.log(`Both win the trophy`);
// } else {
//   console.log(`no one wins`);
// }

// 3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a 
// team only wins if it has a higher score than the other team, and the same time a 
// score of at least 100 points. Hint: Use a logical operator to test for minimum 
// score, as well as multiple else-if blocks �
// 4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when 
// both teams have the same score and both have a score greater or equal 100 
// points. Otherwise, no team wins the trophy
// Test data:
// § Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
// § Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
// § Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

const score_dolphins = (97 + 112 + 101) / 3;
const score_koalas = (109 + 95 + 123) / 3;
console.log(score_dolphins, score_koalas);

if (score_dolphins > score_koalas && score_dolphins >= 100) {
  console.log(`Dolphins win the trophy ❤`);
} else if (score_koalas > score_dolphins && score_koalas >= 100) {
  console.log(`Koalas win the trophy ❤`);
} else if (score_dolphins === score_koalas && score_dolphins >= 100 &&score_koalas >= 100) {
  console.log(`Both win the trophy`);
} else {
  console.log(`no one wins 😫`);
}

/********************************
 * LECTURE: The switch Statement
 *******************************/
// 1. Use a switch statement to log the following string for the given 'language':
// chinese or mandarin: 'MOST number of native speakers!'
// spanish: '2nd place in number of native speakers'
// english: '3rd place'
// hindi: 'Number 4'
// arabic: '5th most spoken language'
// for all other simply log 'Great language too :D'

const the_language = "Chinees";

switch(the_language) {
  case "Chinees":
  case "Manderine":
    console.log(`MOST number of native speakers!`);
    break;
  case "Spanish":
    console.log('2nd place in number of native speakers')
    break;
  case "English":
    console.log('3rd place')
    break;
  case "Hindi":
    console.log('Number 4')
    break;
  case "Arabic":
    console.log('5th most spoken language')
    break;
  default:
    console.log(`for all other simply log 'Great language too :D`);
}

/**********************************************
 * LECTURE: The Conditional (Ternary) Operator
 **********************************************/
// 1. If your country's population is greater than 33 million, use the ternary operator 
// to log a string like this to the console: 'Portugal's population is above average'. 
// Otherwise, simply log 'Portugal's population is below average'. Notice how only
// one word changes between these two sentences!
// 2. After checking the result, change the population temporarily to 13 and then to 
// 130. See the different results, and set the population back to origina
let my_country_population = 18000000;

my_country_population > 33000000 ? console.log("Portugal's population is above average") : console.log("Portugal's population is below average");

/*********************
 * Coding Challenge #4
 *********************/
// Steven wants to build a very simple tip calculator for whenever he goes eating in a 
// restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 
// 300. If the value is different, the tip is 20%.
// Your tasks:
// 1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for 
// this. It's not allowed to use an if/else statement � (If it's easier for you, you can 
// start with an if/else statement, and then try to convert it to a ternary 
// operator!)
// 2. Print a string to the console containing the bill value, the tip, and the final value 
// (bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value 
// 316.25”
// Test data:
// § Data 1: Test for bill values 275, 40 and 430
// Hints:
// § To calculate 20% of a value, simply multiply it by 20/100 = 0.2
// § Value X is between 50 and 300, if it's >= 50 && <= 300 �
// GOOD LUCK 

const bill = 275;
// My answer
// const tip = 0.15;
// const tip_two = 0.20;
// bill >= 50 && bill <= 300 
//   ? console.log(`The bill is ${bill} euros, so the tip will be ${tip * 100}%(${tip * bill}) euros and the final value will be ${tip * bill + bill} euros`)
//   : console.log(`If the bill is ${bill} euros, the tip value will be ${tip_two * 100}%(${tip_two * bill}) euros so the final value is ${tip_two * bill + bill} euros`);

const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value 
${tip + bill}`)