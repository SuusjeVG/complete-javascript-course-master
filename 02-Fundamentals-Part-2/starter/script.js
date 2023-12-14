'use strict';

let has_drivers_license = false;
const pass_drivers_test = true;

if (pass_drivers_test) has_drivers_license = true;
if (has_drivers_license) console.log('You can drive');

/*********************
 * LECTURE: Functions
 ********************/
// 1. Write a function called 'describeCountry' which takes three parameters: 
// 'country', 'population' and 'capitalCity'. Based on this input, the 
// function returns a string with this format: 'Finland has 6 million people and its 
// capital city is Helsinki'
// 2. Call this function 3 times, with input data for 3 different countries. Store the 
// returned values in 3 different variables, and log them to the console
function describeCountry(country, population,capitalCity) {
    const string = `${country} has ${population} million people and its capital city is ${capitalCity}`;
    return string;
}
const netherlands = describeCountry('Netherlands', 18, 'Amsterdam');
const belgium = describeCountry('Belgium', 11.5, 'Brussel');
const germany = describeCountry('Germany', 83, 'Berlin')
console.log(netherlands);
console.log(belgium);
console.log(germany);

/************************************************
 * LECTURE: Function Declarations vs. Expressions
 ************************************************/
// 1. The world population is 7900 million people. Create a function declaration
// called 'percentageOfWorld1' which receives a 'population' value, and
// returns the percentage of the world population that the given population 
// represents. For example, China has 1441 million people, so it's about 18.2% of 
// the world population
// 2. To calculate the percentage, divide the given 'population' value by 7900 
// and then multiply by 100
// 3. Call 'percentageOfWorld1' for 3 populations of countries of your choice, 
// store the results into variables, and log them to the console
// 4. Create a function expression which does the exact same thing, called 
// 'percentageOfWorld2', and also call it with 3 country populations (can be 
// the same populations

// function Declaration (normal function defenition). Unlike function expressions, function declarations are hoisted, which means they are moved to the top of the containing scope during the compilation phase. 
// function percentageOfWorld1(country_population) {
//     const world = 7990;
//     return country_population  / world * 100;
// }
const pop_china = Math.floor(percentageOfWorld1(1141));
const pop_america = Math.floor(percentageOfWorld1(332));
const pop_germany = Math.floor(percentageOfWorld1(83));
console.log(`The Chineze population percentage of the world = ${pop_china}%, 
The American population percentage of the world = ${pop_america}%,
The German population percentage of the world = ${pop_germany}%`);

// function expression (define a way of a function as a value inside an expression)
const percentageOfWorld2 = function (country_population) {
    const world = 7990;
    return country_population  / world * 100;
}
const pop_brasil = percentageOfWorld2(214);
const pop_russia = percentageOfWorld2(143);
const pop_australia = percentageOfWorld2(26);
console.log(`The Brasilian population percentage of the world = ${pop_brasil}%, 
The Russian population percentage of the world = ${pop_russia}%,
The Australian population percentage of the world = ${pop_australia}%`);

/***************************
 * LECTURE: Arrow Functions
 **************************/
// 1. Recreate the last assignment, but this time create an arrow function called 
// 'percentageOfWorld3'
// arrow functionn with only 1 parameter and one line.
const percentageOfWorld3 = country_population => (country_population / 7990) * 100;
const pop_africa = percentageOfWorld3(1216)
console.log(`The percentage population of the world for Africa is ${pop_africa}%`);

//arrow function with multple parameters and also need multple lines
const yearsUntilRetirement = (birthYeah, firstName) => {
    const age = 2037 - birthYeah;
    const retirement = 65 - age;
    // return retirement;
    return `${firstName} retires in ${retirement} years`;
}
console.log(yearsUntilRetirement(1991, 'Jonas')); 
console.log(yearsUntilRetirement(1980, 'Bob'));

/********************************************
 * LECTURE: Functions Calling Other Functions
 ********************************************/
// 1. Create a function called 'describePopulation'. Use the function type you 
// like the most. This function takes in two arguments: 'country' and 
// 'population', and returns a string like this: 'China has 1441 million people, 
// which is about 18.2% of the world.'
// 2. To calculate the percentage, 'describePopulation' call the 
// 'percentageOfWorld1' you created earlier
// 3. Call 'describePopulation' with data for 3 countries of your choice

//my answer 
function percentageOfWorld1(country_population) {
    const world = 7990;
    return country_population  / world * 100;
}
function describePopulation(country, population) {
    const percentage = percentageOfWorld1(population)
    return `${country} has ${population} million people, which is about ${percentage} of the world.`
}
const africa = describePopulation('AFrica', 1216);
const america = describePopulation('America', 332);
const asia = describePopulation('America', 4561);
console.log(africa);
console.log(america);
console.log(asia);

//final answer
// const describePopulation = function (country, population) {
//     const percentage = percentageOfWorld1(population);
//     const description = `${country} has ${population} million people, which is about ${percentage}% of the world.`;
//     console.log(description);
// };
// describePopulation('Portugal', 10);
// describePopulation('China', 1441);
// describePopulation('USA', 332);

/*********************
 * Coding Challenge #1
 *********************/

// Create an arrow function 'calcAverage' to calculate the average of 3 scores
const calcAverage = score => score / 3; 

// Use the function to calculate the average for both teams
let total_score_dolpins = 44 + 23 + 71; // 85 + 54 + 41;
let total_score_koalas = 65 + 54 + 49; //  23 + 34 + 27;

console.log(calcAverage(total_score_dolpins));
console.log(calcAverage(total_score_koalas));

// Create a function 'checkWinner' that takes the average score of each team 
// as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner 
// to the console, together with the victory points, according to the rule above. 
// Example: "Koalas win (30 vs. 13)

const avgDolhins = calcAverage(total_score_dolpins);
const avgKoalas = calcAverage(total_score_koalas);

function checkWinner(avgDolhins, avgKoalas) {
    // const dubbel_score_koalas = avgKoalas * 2;
    // const dubbel_score_dolphines = avgDolhins * 2;

    if (avgDolhins >= 2 * avgKoalas) {
        console.log(`The dolphines win ${avgDolhins} vs ${avgKoalas}`);
    } else if (avgKoalas >=  2 * avgDolhins ) {
        console.log(`The koalas win ${avgKoalas} vs ${avgDolhins}`);
    } else {
        console.log(`no one wins`);
    }
};

checkWinner(avgDolhins, avgKoalas);

total_score_dolpins = 85 + 54 + 41;
total_score_koalas = 23 + 34 + 27;
console.log(calcAverage(total_score_dolpins));
console.log(calcAverage(total_score_koalas));

const avgDolhinsNew = calcAverage(total_score_dolpins);
const avgKoalasNew = calcAverage(total_score_koalas);

checkWinner(avgDolhinsNew, avgKoalasNew);

// Final answer teacher
// const calcAverage = (a, b, c) => (a + b + c) / 3;
// console.log(calcAverage(3, 4, 5));

// Test 1
// let scoreDolphins = calcAverage(44, 23, 71);
// let scoreKoalas = calcAverage(65, 54, 49);
// console.log(scoreDolphins, scoreKoalas);

// const checkWinner = function (avgDolphins, avgKoalas) {
//   if (avgDolphins >= 2 * avgKoalas) {
//     console.log(`Dolphins win 🏆 (${avgDolphins} vs. ${avgKoalas})`);
//   } else if (avgKoalas >= 2 * avgDolphins) {
//     console.log(`Koalas win 🏆 (${avgKoalas} vs. ${avgDolphins})`);
//   } else {
//     console.log('No team wins...');
//   }
// }
// checkWinner(scoreDolphins, scoreKoalas);

// checkWinner(576, 111);

// Test 2
// scoreDolphins = calcAverage(85, 54, 41);
// scoreKoalas = calcAverage(23, 34, 27);
// console.log(scoreDolphins, scoreKoalas);
// checkWinner(scoreDolphins, scoreKoalas);

/**********************************
 * LECTURE: Introduction to Arrays
 **********************************/
// 1. Create an array containing 4 population values of 4 countries of your choice. 
// You may use the values you have been using previously. Store this array into a 
// variable called 'populations'
// 2. Log to the console whether the array has 4 elements or not (true or false)
// 3. Create an array called 'percentages' containing the percentages of the 
// world population for these 4 population values. Use the function 
// 'percentageOfWorld1' that you created earlier to compute the 4 
// percentage values

const population = [27, 100, 40, 300];

console.log(population.length === 4 ? "het is gelijk aan 4" : "Het is niet gelijk aan 4");

// function percentageOfWorld1(country_population) {
//     const world = 7990;
//     return country_population  / world * 100;
// }

const percentage = [percentageOfWorld1(population[0]), percentageOfWorld1(population[1]), percentageOfWorld1(population[2]), percentageOfWorld1(population[3])];
console.log(percentage);

/*******************************************
 * LECTURE: Basic Array Operations (Methods)
 *******************************************/
// 1. Create an array containing all the neighbouring countries of a country of your 
// choice. Choose a country which has at least 2 or 3 neighbours. Store the array 
// into a variable called 'neighbours'
// 2. At some point, a new country called 'Utopia' is created in the neighbourhood of 
// your selected country. So add it to the end of the 'neighbours' array
// 3. Unfortunately, after some time, the new country is dissolved. So remove it from 
// the end of the array
// 4. If the 'neighbours' array does not include the country ‘Germany’, log to the 
// console: 'Probably not a central European country :D'
// 5. Change the name of one of your neighbouring countries. To do that, find the 
// index of the country in the 'neighbours' array, and then use that index to 
// change the array at that index position. For example, you can search for
// 'Sweden' in the array, and then replace it with 'Republic of Sweden'.
const neighbours_germany = ['The Netherlands', 'Denmark', 'Poland', 'czech', 'Belgum', 'luxemburg', 'France', 'Austria', 'Switzerland', 'Liechtenstein' ];
console.log(neighbours_germany);
neighbours_germany.push('Utopia');
neighbours_germany.pop('Utopia');

if (!neighbours_germany.includes('Germany')) {
    console.log('It does not include germany');
}

let index_neighbour = neighbours_germany.indexOf('czech');
console.log(index_neighbour);
neighbours_germany[3] = 'Finland';
console.log(neighbours_germany);

/*********************
 * Coding Challenge #2
 *********************/
function calcTip(bill){
    if (bill >= 50 && bill <= 300) {
        return bill * 0.15
    } else {
        return bill * 0.20
    }
}

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const total = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]]


console.log(bills);
console.log(tips);
console.log(total);

/**********************************
 * LECTURE: Introduction to Objects
 **********************************/
// 1. Create an object called 'myCountry' for a country of your choice, containing 
// properties 'country', 'capital', 'language', 'population' and 
// 'neighbours' (an array like we used in previous assignments

const my_country = {
    country: 'The Netherlands',
    capital: 'Amsterdam',
    language: 'Dutch',
    population: 18, //million
    neighbours: ['Belgium', 'Germany'],

    describe: function () {
        return console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`);
    },

    checkIsland: function () {
        return this.is_island = this.neighbours.length === 0 ? true : false;
    }
};

console.log(my_country);

/**********************************
 * LECTURE: Dot vs. Bracket Notation
 **********************************/
// 1. Using the object from the previous assignment, log a string like this to the 
// console: 'Finland has 6 million finnish-speaking people, 3 neighbouring countries 
// and a capital called Helsinki.'
// 2. Increase the country's population by two million using dot notation, and then 
// decrease it by two million using brackets notation

console.log(`${my_country.country} has ${my_country.population} million ${my_country.language}-speaking people, ${my_country.neighbours.length} neighbouring countries and a capital called ${my_country.capital}.`);
// dot notation
console.log(`${my_country.country} has ${my_country.population - 2} million ${my_country.language}-speaking people, ${my_country.neighbours.length} neighbouring countries and a capital called ${my_country.capital}.`);
// bracket notation
console.log(`${my_country.country} has ${my_country['population' - 2]} million ${my_country.language}-speaking people, ${my_country.neighbours.length} neighbouring countries and a capital called ${my_country.capital}.`);

/***************************
 * LECTURE: Object Methods
 ***************************/
// 1. Add a method called 'describe' to the 'myCountry' object. This method 
// will log a string to the console, similar to the string logged in the previous 
// assignment, but this time using the 'this' keyword.
// 2. Call the 'describe' method
// 3. Add a method called 'checkIsland' to the 'myCountry' object. This 
// method will set a new property on the object, called 'isIsland'. 
// 'isIsland' will be true if there are no neighbouring countries, and false if 
// there are. Use the ternary operator to set the property

my_country.describe();
console.log(my_country.checkIsland());


// Extra challenge 
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    birthYeah: 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    hasDriversLicense: true,
  
    // calcAge: function (birthYeah) {
    //   return 2037 - birthYeah;
    // }
  
    // calcAge: function () {
    //   // console.log(this);
    //   return 2037 - this.birthYeah;
    // }
  
    calcAge: function () {
      this.age = 2037 - this.birthYeah;
      return this.age;
    },

    getSummary: function () {
        // if (this.hasDriversLicense === true) {
        //     return this.hasDriversLicense = 'a';
        // } else {
        //     return this.hasDriversLicense = 'no';	
        // }
        this.hasDriversLicense = 'a';
        return `${this.firstName} is a ${this.calcAge()} year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'no'} drivers license`;
    }

};

// Challenge
// "Jonas is a 46-year old teacher, and he has a driver's license"
console.log(jonas.getSummary());

/**********************
 * Coding Challenge #3
 **********************/
// Let's go back to Mark and John comparing their BMIs! This time, let's use objects to 
// implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)

// 1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
// 2. Create a 'calcBMI' method on each object to calculate the BMI (the same 
// method on both objects). Store the BMI value to a property, and also return it 
// from the method
// 3. Log to the console who has the higher BMI, together with the full name and the 
// respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
// Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.

const mark = {
    first_name: 'Mark',
    last_name: 'Miller',
    weight: 78,
    height: 1.69,

    calcBmi: function () {
        this.bmi = this.weight / (this.height * this.height);
        return this.bmi;
    }
}
console.log(mark.calcBmi());

const john = {
    first_name: 'John',
    last_name: 'Smith',
    weight: 92,
    height: 1.95,

    calcBmi: function () {
        this.bmi = this.weight / (this.height * this.height);
        return this.bmi;
    }
}

console.log(john.calcBmi());

console.log(`${mark.first_name} ${mark.last_name} his BMI is ${mark.calcBmi()} and ${john.first_name} ${john.last_name} his BMI is ${john.calcBmi()}. So ${mark.calcBmi() > john.calcBmi() ? 'Mark his BMI is higher' : 'John his BMI is higher'}.`);

/**********************
 * LOOPS AND ITERATION
 * *******************/
///////////////////////////////////
// LECTURE: Iteration: The for Loop
///////////////////////////////////
// 1. There are elections in your country! In a small town, there are only 50 voters. 
// Use a for loop to simulate the 50 people voting, by logging a string like this to 
// the console (for numbers 1 to 50): 'Voter number 1 is currently voting

for (let voter = 1; voter <= 50; voter++) {
    console.log(`Voter number ${voter} is currently voting: `);
}

/***************************************************
 * LECTURE: Looping Arrays, Breaking and Continuing
 ***************************************************/
// 1. Let's bring back the 'populations' array from a previous assignment
// 2. Use a for loop to compute an array called 'percentages2' containing the 
// percentages of the world population for the 4 population values. Use the 
// function 'percentageOfWorld1' that you created earlier
// 3. Confirm that 'percentages2' contains exactly the same values as the 
// 'percentages' array that we created manually in the previous assignment, 
// and reflect on how much better this solution is

const new_population_array = [27, 100, 40, 300];
const percentages2 = [];

// function percentageOfWorld1(country_population) {
//     const world = 7990;
//     return country_population  / world * 100;
// }

for (let i = 0; i < new_population_array.length; i++) {
    percentages2.push(percentageOfWorld1(new_population_array[i]));
}

console.log(percentages2);

/***********************************************
 * LECTURE: Looping Backwards and Loops in Loops
 ***********************************************/
// 1. Store this array of arrays into a variable called 'listOfNeighbours'
// [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 
// 'Russia']];
// 2. Log only the neighbouring countries to the console, one by one, not the entire 
// arrays. Log a string like 'Neighbour: Canada' for each country
// 3. You will need a loop inside a loop for this. This is actually a bit tricky, so don't 
// worry if it's too difficult for you! But you can still try to figure this out anyway �

const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];
console.log(` Neighbour: ${listOfNeighbours[0][0]}`);

for (let i = listOfNeighbours.length - 1; i >= 0; i--) {
    // console.log(listOfNeighbours[i]);
    for (let y = 0; y < listOfNeighbours[i].length; y++) {
        console.log(` Neighbour: ${listOfNeighbours[i][y]}`);
    }
}

/**********************
 * Coding Challenge #4
 **********************/
// Let's improve Steven's tip calculator even more, this time using loops!
// Your tasks:
// 1. Create an array 'bills' containing all 10 test bill values
// 2. Create empty arrays for the tips and the totals ('tips' and 'totals')
// 3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate 
// tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!

// Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
// Hints: Call ‘calcTip ‘in the loop and use the push method to add values to the 
// tips and totals arrays 

const bills_two = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips_two = [];
const totals = [];

// function calcTip(bill){
//     if (bill >= 50 && bill <= 300) {
//         return bill * 0.15
//     } else {
//         return bill * 0.20
//     }
// }

for (let i = 0; i < bills_two.length; i++) {
    const tip = calcTip(bills_two[i]);
    tips_two.push(tip);
    totals.push(tip + bills_two[i]);
}

console.log(tips_two);  
console.log(totals);

///////////////
// Bonus:
// 4. Bonus: Write a function 'calcAverage' which takes an array called 'arr' as 
// an argument. This function calculates the average of all numbers in the given 
// array. This is a difficult challenge (we haven't done this before)! Here is how to 
// solve it:
// 4.1. First, you will need to add up all values in the array. To do the addition, 
// start by creating a variable 'sum' that starts at 0. Then loop over the 
// array using a for loop. In each iteration, add the current value to the 
// 'sum' variable. This way, by the end of the loop, you have all values 
// added together
// 4.2. To calculate the average, divide the sum you calculated before by the 
// length of the array (because that's the number of elements)
// 4.3. Call the function with the 'totals' array

const calc_Average = function(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum = sum + array[i];
    }
    return sum / array.length;
}

console.log(calc_Average(totals));

