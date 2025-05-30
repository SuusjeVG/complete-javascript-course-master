'use strict';

// Data needed for a later exercise
// const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// books data for assignments
const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: [
      'computer science',
      'programming',
      'algorithms',
      'data structures',
      'java',
      'math',
      'software',
      'engineering',
    ],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: [
      'Harold Abelson',
      'Gerald Jay Sussman',
      'Julie Sussman (Contributor)',
    ],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: [
      'computer science',
      'programming',
      'javascript',
      'software',
      'engineering',
    ],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0,
      },
    },
    highlighted: true,
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: ['Randal E. Bryant', "David Richard O'Hallaron"],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: [
      'computer science',
      'computer systems',
      'programming',
      'software',
      'C',
      'engineering',
    ],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16,
      },
    },
    highlighted: true,
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: [
      'computer science',
      'operating systems',
      'programming',
      'software',
      'C',
      'Java',
      'engineering',
    ],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65,
      },
    },
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6,
      },
    },
    highlighted: true,
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090,
      },
    },
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: [
      'computer science',
      'compilers',
      'engineering',
      'interpreters',
      'software',
      'engineering',
    ],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0,
      },
    },
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808,
      },
    },
    highlighted: true,
  },
];

// 1 Destructuring Arrays
/******
1.1
Destructure the books array into two variables called firstBook and secondBook.
********/
const [firstBook, secondBook] = books;
console.log(firstBook, secondBook);

/******
1.2
Destructure the books array into a variable called thirdBook. You must skip the first two books.
********/
const [, , thirdBook] = books;
console.log(thirdBook);

/******
1.3
Below is the nested ratings array that contains two other arrays. Destructure the nested ratings 
arrays into two variables called rating and ratingsCount. In the result of your destructuring, 
the ratings variable should store a number 4.19, and the ratingsCount variable should store 
a number 144584.
********/
const ratings = [
  ['rating', 4.19],
  ['ratingsCount', 144584],
];

const [[, rating], [, ratingsCount]] = ratings;
console.log(rating, ratingsCount);

/******
1.4
Below is the ratingStars array. Destructure it into three variables called 
fiveStarRatings, oneStarRatings and oneStarRatings. Assign the threeStarRatings v
ariable with a default value of 0.
********/

const ratingStars = [63405, 1808];
const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;
console.log(fiveStarRatings, oneStarRatings, threeStarRatings);

// 2 Destructuring Objects
/******
2.1 Destructure the first book object from the books array into variables called title, author and ISBN.
********/

// my solution
const { title, author, ISBN } = firstBook; // I got this variable from 1.1
console.log(title, author, ISBN);

// solution
// const { title, author, ISBN } = books[0];
// console.log(title, author, ISBN);

/******
2.2
Each book object has the keywords property. Destructure the first 
book object from the books array into a variable called tags. The tags 
variable should be assigned with the value of the keywords property.
********/

// exercise 1.1 has variable called firstbook wich I destructed from the books array
const { keywords: tags } = firstBook; // or book[0]
console.log(tags);

/******
2.3
The seventh book from the books array is missing the programmingLanguage property. 
Destructure the seventh book object (books[6]) into variables called language and 
programmingLanguage. Assign the programmingLanguage variable with a default value 
of 'unknown'.
********/

const { language, programmingLanguage = 'unknown' } = books[6];
console.log(language, programmingLanguage);
console.log(books[6]);

/******
2.4
Below are two variables called bookTitle and bookAuthor. Reassign them with 
the values of the title and author properties of the first book object from the 
books array.
********/

// let bookTitle = 'unknown';
// let bookAuthor = 'unknown';

// ({ title: bookTitle, author: bookAuthor } = books[0]);
// console.log(bookTitle, bookAuthor);

/******
2.5
Each book object has a deeply nested rating property as illustrated below:

Destructure the first book object from the books array into a variable called bookRating. In the result of your 
destructuring, the bookRating variable should be assigned with the value of the book[0].thirdParty.goodreads.rating property.

Please do most of the work on the left side of the assignment operator: const ... = books[0];
********/

const {
  thirdParty: {
    goodreads: { rating: bookRating },
  },
} = firstBook;
console.log(bookRating);

/******
2.6
Write a function called printBookInfo that has three parameters called title, author and year. This function should work for a single object passed 
as an argument, and it should log to the console information about the book in this format: "${title} by ${author}, ${year}".

If year is undefined (was not passed), it should be assigned with a default value of 'year unknown'.
********/

// my answer
// function printBookInfo(title, author, year = 2011) {
//   console.log(`${title} by ${author} ${year}`);
// }
// printBookInfo(books[0].title, books[0].author[0], books[0].year);

function printBookInfo({ title, author, year = 'unknown' }) {
  console.log(`${title} by ${author} ${year}`);
}

printBookInfo({
  title: 'Algorithms',
  author: 'Robert Sedgewick',
  year: '2011',
});

// example 2
// printBookInfo({ title: 'Algorithms', author: 'Robert Sedgewick' });

// 3 The Spread Operator
// small exercis for the restaurant data
// Get the main an starter menu data and combine them togheter in a new array
const full_menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(full_menu);

/******
3.1
Each book object has the author property, which stores an array of strings 
(author names) if there are multiple authors, or a single string (author name) if 
there is just one author.

Declare an array called bookAuthors, and fill it with authors of the first 
two books from the books array. The bookAuthors array should have just one level 
(no nested arrays).
********/

const bookAuthor = [...books[0].author, ...books[1].author];
console.log(bookAuthor);

/******
3.2
Write a function called spellWord that accepts a single string as an argument. 
This function should log to the console each letter of the argument separated 
by a space.
********/

function spellWord(string) {
  console.log(...string);
}

spellWord('javascript');

// Rest Pattern and Parameters
/******
4.1
Destructure the keywords property (array) of the first book from the books
array into variables called mainKeyword and rest. The first keyword should 
be assigned to mainKeyword, and the rest of the keywords should be assigned 
to the rest variable (it should be an array).
********/

const [mainKeyword, ...rest] = firstBook.keywords;
console.log(mainKeyword, rest);

/******
4.2
Destructure the second book from the books array 
into a variable called bookPublisher. The bookPublisher 
variable should be assigned with the value of the publisher 
property of the book object. Assign the rest of the 
properties to the restOfTheBook variable.
********/

const { publisher: bookPublisher, ...restOfTheBook } = secondBook;
console.log(bookPublisher, restOfTheBook);
// console.log(secondBook);

/******
4.3
Write a function called printBookAuthorsCount that has 
two parameters called title and authors. The authors 
parameter should accept any number of arguments. This 
function should log to the console a string formatted 
like that: "The book "${title}" has ${authors.length} authors".
********/

// function printBookAuthorsCount(title, ...authors) {
//   console.log(`The book ${title} has ${authors.length} authors`);
// }

// printBookAuthorsCount(firstBook.title, 'Robert Sedgewick', 'Kevin Wayne');

// Short Circuiting (&& and ||)

/******
5.1
Some of the book objects have the programmingLanguage property, which specifies what programming language 
is used in the book, for example.

Write a function called hasExamplesInJava that takes a book object 
from the books array as an argument. This function should return true if 
the book uses Java, or a string 'no data available' if it uses other 
language or no programming language at all.

Use short-circuiting.
********/

function hasExamplesInJava(book) {
  return console.log(
    book.programmingLanguage === 'Java' || 'no data available'
  );
}
hasExamplesInJava(books[0]);

/******
5.2
Some of the book objects have the onlineContent property, which is 
either true or false. Loop over the books array, and for the books 
that provide online content, log to the console a string in this 
format: "${title}" provides online content. Use short-circuiting.
********/

// my answer
// for (let i = 0; i < books.length; i++) {
//   const onlineContent = books[i].onlineContent
//     ? `${books[i].title}, provides online content`
//     : `${books[i].title}, provides NO online content;`;
//   console.log(onlineContent);
// }

for (let i = 0; i < books.length; i++) {
  books[i].onlineContent &&
    console.log(`"${books[i].title}" provides online content`);
}

// The Nullish Coalescing Operator (??)

/******
6.1
There are objects in the books array that don't have the onlineContent 
property at all. Loop over the books array, and log a string to the 
console in this format: "${title}" provides no data about its online 
content.
********/

for (let i = 0; i < books.length; i++) {
  books[i].onlineContent ??
    console.log(`"${books[i].title}" provides no data about its online 
    content`);
}

// Logical Assignments Operators

/******
7.1
Some of the book objects from the books array are missing the edition 
property. Loop over the books array, and assign this property with a 
number 1 (if it doesn't already exist). Use logical assignment operators.
********/


/******************
Coding challange 1
******************/
// We're building a football betting app (soccer for my American friends 😅)!
// Suppose we get data from a web service about a certain game ('game' variable on
// next page). In this challenge we're gonna work with that data.
// Your tasks:
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
  'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};  


// // 1. Create one player array for each team (variables 'players1' and
// // 'players2')
// const { players } = game;
// // const [players1, players2] = game.players;
// const [players1, players2] = players;
// // console.log('hello', players1, players2);


// // 2. The first player in any player array is the goalkeeper and the others are field
// // players. For Bayern Munich (team 1) create one variable ('gk') with the
// // goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
// // field players

// // team1: 'Bayern Munich',
// // const [gk1, ...fieldplayers1] = players1
// const [gk1] = players1
// const [, ...fieldplayers1] = players1;
// // console.log(gk1, fieldplayers1, 'hello');

// // team2: 'Borrussia Dortmund',
// // const [gk2, ...fieldplayers2] = players2;
// const [gk2] = players2;
// const [, ...fieldplayers2] = players2;


// // 3. Create an array 'allPlayers' containing all players of both teams (22
// // players)

// const allPlayers = [...players1, ...players2];
// // console.log(allPlayers);

// // 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
// // new array ('players1Final') containing all the original team1 players plus
// // 'Thiago', 'Coutinho' and 'Perisic'

// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']
// // console.log(players1Final);

// // 5. Based on the game.odds object, create one variable for each odd (called
// // 'team1', 'draw' and 'team2')

// const {team1, x: draw, team2} = game.odds;
// // console.log(team1, draw, team2);

// // 6. Write a function ('printGoals') that receives an arbitrary number of player
// // names (not an array) and prints each of them to the console, along with the
// // number of goals that were scored in total (number of player names passed in)

// const printGoals = function(...players) {
//     console.log(players);
//     console.log(`${players.length} goals were scored`);
// }

// // printGoals('Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels');
// printGoals(...game.scored);

// // 7. The team with the lower odd is more likely to win. Print to the console which
// // team is more likely to win, without using an if/else statement or the ternary
// // operator.

// console.log(`${game.team1} is more likely to win because their odds are ${team1}`);
// // team1 < team2 && console.log('Team 1 is more likely to win');
// // team1 > team2 && console.log('Team 2 is more likely to win');


/******************
Coding Challenge #2
******************/
// Let's continue with our football betting app! Keep using the 'game' variable from
// before.

// Your tasks:
// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")

for (let [index, goalscorer] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: was scored by ${goalscorer}`);
}

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
const odds = Object.values(game.odds);

let average = 0
for (const odd of odds) {
  average += odd
}
console.log(average / odds.length);


// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

const entries = Object.entries(game.odds);
// console.log( entries);

// console.log(game['team1']);

for ( const [key, odds] of entries) {
  console.log(`Odd of victory ${game[key] || 'draw'}: ${odds}`);
}

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }


const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1)
}

console.log(scorers);

/******************
* Coding Challenge #3
******************/

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//  1. Create an array 'events' of the different game events that happened (no duplicates)
const events = [...new Set(gameEvents.values())]
console.log(events);

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
gameEvents.delete(64)
console.log(gameEvents);

// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
const gameMinutes = 90;
console.log(`An event happened, on average, every ${gameMinutes / gameEvents.size} minutes"`);

// if you want the last index
const time = [...gameEvents.keys()].pop();
console.log(`An event happened, on average, every ${time / gameEvents.size} minutes"`);


// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

for (const [key, value] of gameEvents) {
  if( key <= 45 ) {
    console.log(`[FIRST HALF] ${key}: ${value}`);
  } else {
    console.log(`[SECOND HALF] ${key}: ${value}`);
  }
}

console.log('-----------------');
for (const [key, value] of gameEvents) {
  console.log(`[${ key <= 45 ? "FIRST" : "SECOND"} HALF] ${key}: ${value}`);
}


/******************
* Coding Challenge #4
******************/
/*
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

// 1.Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
const $textarea = document.querySelector('#text-input')
const $button = document.querySelector('#btn')


// let vinkje = ' '
// $button.addEventListener('click', (event) => {
//   const input = $textarea.value
//     .toLowerCase()
//     .split("\n")

//   for (const word of input) {
//     let [firstwoord, secondWoord] = word.trim().split('_')

//     // let output = firstwoord + secondWoord.replace(secondWoord[0], secondWoord[0].toUpperCase())
//     let output = firstwoord + (secondWoord[0].toUpperCase() + secondWoord.slice(1))

//     console.log(`${output.padEnd(20, ' ')} ${vinkje += '✅'}`);
//   }

// })

$button.addEventListener('click', function () {
  const text = document.querySelector('#text-input').value;
  const rows = text.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});

// EXTRA FOR MYSELF

// const maskCreditCard = function (number) {
//   let str = number + "";
//   const maskedNumebr = str
//     .slice(-4)
//     .padStart(str.length, '*')


//   return maskedNumebr
// }

// console.log(maskCreditCard(12335464567))

// const capitlizeName = function(name) {
//   let fullName = name
//     .toLowerCase()
//     .split(' ')
//     .map(name => name[0].toUpperCase() + name.slice(1))
//     .join(' ')

//   return fullName
// }

// console.log(capitlizeName('jessica ann smith davis'));
// console.log(capitlizeName('susan van Glabbeek'));
// const capitlize = function(string) {
//   const exeptions = ['de', 'het', 'een', 'en', 'maar', 'of', 'in', 'met'];

//   const capitilizedString = string
//     .toLowerCase()
//     .split(' ')
//     .map( word => exeptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1))
//     .join(' ')


//   return capitilizedString
// }

// console.log(capitlize('Ik ben een meisje met bruin HAAR'));

///////////////////////////////////////
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// make code better
const getCode = str => str.slice(0, 3).toUpperCase()

const seperateFlights = flights.split('+')

for (const flight of seperateFlights) {
  const singleflight = flight.split(';');
  let [status, from, to, time] = singleflight

  //get delayed or not
  status = status.replaceAll('_', ' ').trimStart();

  // get cournty (optional use function)
  from = from.slice(0, 3).toUpperCase()
  to = to.slice(0, 3).toUpperCase()

  console.log(`${status.includes('Delayed') ? '🔴 ' + status : status } from ${from} to ${to} (${time.replace(':', 'h')})`.padStart(44));

}
// console.log(seperateFlights);


