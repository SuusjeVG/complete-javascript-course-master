'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const loginbtn = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// display all movements of an account with html blocks and the right info per account
const displayMovements = function (movements, sort = false) {
  // destroy first html elements
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((item, i) => {
    const type = item > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}"> ${i + 1} ${type} </div>
        <div class="movements__value"> ${item} € </div>
      </div>
    `;

    containerMovements.insertAdjacentHTML( "afterbegin" , html)
  });

}

// calc and display total balance
const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce( (acc, value) => {
    return acc + value
  }, 0)

  labelBalance.innerText = ` ${acc.balance.toString()} EUR `
}

//display the summery
const calcDisplaySummery = function (acc) {
  // total deposit
  const deposits = acc.movements.filter((value) => {
    return value > 0 
  })
  const totalIn = deposits.reduce((acc, value) => {
    return acc + value
  }, 0)

  labelSumIn.textContent = `${totalIn}€`

  // total withdrawaks
  const withdrawals = acc.movements.filter((value) => {
    return value < 0 
  })
  const totalOut = withdrawals.reduce((acc, value) => {
    return acc + value
  }, 0)
  labelSumOut.textContent = `${Math.abs(totalOut)}€`

  const interest = deposits
    .map(deposit => (deposit * acc.interestRate) /100)
    .filter(value => value >= 1 )
    .reduce((acc, value) => {
      return acc + value
    }, 0)

  labelSumInterest.textContent = `${interest}€`
}

// create short username and add to the object
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('')
  });
}

createUsernames(accounts);

// update UI function
const updateUI = function(acc) {
    // Display movements
    displayMovements(acc.movements)
    // Display total balance
    calcDisplayBalance(acc)
    // Display summery
    calcDisplaySummery(acc) 
}

// event handler
let currentAccount;

loginbtn.addEventListener( 'click', function(e) {
  e.preventDefault()
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value )

  // Login
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display welcome text and UI
    labelWelcome.textContent = `Welcome ${currentAccount.owner}`
    containerApp.style.opacity = 1;

    //clear input fields
    inputLoginUsername.value = ''
    inputLoginPin.value = ''
    inputLoginPin.blur()
    
    updateUI(currentAccount)

  } else {
    console.log('Wrong login');
  }
});

// transfer money to other accounts
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault()

  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
  const amount = Number(inputTransferAmount.value)

  inputTransferTo.value = ''
  inputTransferAmount.value = ''

  if (
    amount > 0 && 
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {

    //doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //update UI
    updateUI(currentAccount)
 
  } else {
    console.log('transfer failed');
  }

})

// adding loan too your account
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  // only grants loan if there is atleast one deposit with atleast 10% value of the requested loan amount.
  const request = currentAccount.movements.some( (mov) => {
    return mov >= amount * 0.10
  })

  if (amount > 0 && request) {
    // add movement to array
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount)
  }

  inputLoanAmount.value = ' '
})

// delete your account
btnClose.addEventListener('click', (e) => {
  e.preventDefault()
  // let inputUser = inputCloseUsername.value
  // let inputPin = Number(inputClosePin.value) 

  if (
    inputCloseUsername.value === currentAccount.username && 
    Number(inputClosePin.value)  === currentAccount.pin
  ) {
    // find user index
    const index = accounts.findIndex( function (acc) {
      return acc.username === inputCloseUsername.value
    });

    // delete user
    accounts.splice(index, 1)

    // Hide UI
    containerApp.style.opacity = 0;

  } else {
    console.log('false');
  }

  // set fields to empty
  inputCloseUsername.value = ''
  inputClosePin.value = ''
})

let sorted = false;

btnSort.addEventListener('click', (e) => {
  e.preventDefault()
  displayMovements(currentAccount.movements, sorted = !sorted)
})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


// movements.forEach( (item, index) => {
//   if (item > 0 ) {
//     console.log(`Movement ${index + 1}, you deposited ${item} 🤑`);
//   } else {
//     console.log(`Movement ${index + 1}, You withdrew ${Math.abs(item) } ❌`);
//   }
// })

// console.log(currencies);

// MAP
// const euroToUsd = 1.1;

// const movementsUSD = movements.map( (mov) => mov * euroToUsd);

// console.log(movementsUSD);

// FILTER
// const withdrawals = movements.filter ((mov) => {
//   return mov < 0;
// })

// console.log(withdrawals);

// REDUCE
// const balance = movements.reduce( (acc, value) => {
//   return acc + value
// }, 0)

// labelBalance.innerText = ` ${balance.toString()},- € `

// Maximum value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

// Find method 
// let accountJessica = {};

// for (const element of accounts) {
//   if (element.owner === 'Jessica Davis'){
//     accountJessica = element
//   }
// }

// console.log(accountJessica);


// Dice
// const diceArray = Array.from( {length: 100}, (_, i) => i + 1 )
// const random = Math.trunc(Math.random() * diceArray.length)
// console.log(random);

// Extra exercise
// 1. Create new array with all the incomes of the bank from all accounts
// const allIncomes = accounts
//   .flatMap((acc) => {
//     return acc.movements
//   })
//   .filter((mov => mov > 0))
//   .reduce((acc, deposit) => acc + deposit, 0)

// console.log(allIncomes);

// 2.how many deposit are there with atleast 1000 dollars
// const deposits = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length

// console.log(deposits);

// 3. create a new obejct instead of a number or string for the different movements (depo, withdrawels). 
// const {deposits, withdrawals} = accounts
// const totalBankObject = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((sums, current) => {

//   }, {deposits: 0, withdrawals: 0})

// console.log(totalBankObject);

// 4. use reduce method only instead of filter map etc
// let allMovements = []
// const test = accounts.reduce((sums, current) => {
//   allMovements.push(...current.movements)
//   allMovements > 0 ? sums + allMovements : sums
//   // current > 0 ? sums.deposits += current  : sums.withdrawals += current
//   return sums
// }, 0)

// console.log(allMovements);
// console.log(test);

// 4. convert to title case string
// const convertTitleCase = function (title) {
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'in', 'with']

//   const titleCase = title
//     .toLowerCase()
//     .split(' ') 
//     // if the current word is included in that exeptions array return the normal word otherwise capitlise the first letter of the word. 
//     .map( (word) => exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1))
//     .join(' ')

//   return titleCase
// }

// console.log(convertTitleCase('This is a Nice title'));

/**********
 * Coding Challenge #1
 *********/
/*
  Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
  about their dog's age, and stored the data into an array (one array for each). For
  now, they are just interested in knowing whether a dog is an adult or a puppy.
  A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
  old.

  Your tasks:
  Create a function 'checkDogs', which accepts 2 arrays of dog's ages
  ('dogsJulia' and 'dogsKate'), and does the following things:
  1. Julia found out that the owners of the first and the last two dogs actually have
  cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
  ages from that copied array (because it's a bad practice to mutate function
  parameters)
  2. Create an array with both Julia's (corrected) and Kate's data
  3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
  is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy")
  4. Run the function for both test datasets
  Test data:
  § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
  § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
  Hints: Use tools from all lectures in this section so far
*/
// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];


// const checkDogs = function (dogsJulia, dogsKate) {
//   const newArrJulia = dogsJulia.slice(1, -2);
//   console.log(newArrJulia);
//   const togheter = newArrJulia.concat(dogsKate);

//   togheter.forEach((dog, index) => {
//     if (dog >= 3) {
//       console.log(`Dog number ${index + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${index + 1} is a puppy, and is ${dog} years old 🐶`);
//     }

//   })
// }

// checkDogs(julia, kate)


/**********
 * Coding Challenge #2
 *********/

/*
  Let's go back to Julia and Kate's study about dogs. This time, they want to convert
  dog ages to human ages and calculate the average age of the dogs in their study.
  Your tasks:
  Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
  ages ('ages'), and does the following things in order:
  1. Calculate the dog age in human years using the following formula: if the dog is
  <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
  humanAge = 16 + dogAge * 4
  2. Exclude all dogs that are less than 18 human years old (which is the same as
  keeping dogs that are at least 18 years old)
  3. Calculate the average human age of all adult dogs (you should already know
  from other challenges how we calculate averages )
  4. Run the function for both test datasets
  Test data:
  § Data 1: [5, 2, 4, 1, 15, 8, 3]
  § Data 2: [16, 6, 10, 5, 6, 1, 4]
  GOOD LUCK 
*/

// const dogAges = [5, 2, 4, 1, 15, 8, 3]

// const calcAverageHumanAge = function(array) {
//   const humanAges = array.map( (dogAge, index) => {
//     if (dogAge <= 2) {
//       return dogAge * 2
//     } else {
//       return 16 + dogAge * 4
//     }
//   })

//   const adults = humanAges.filter( (age) => {
//     return age >= 18
//   })

//   const total = adults.reduce((acc, value)=> {
//     return acc + value
//   }, 0)

//   return total / adults.length
// }

// console.log(calcAverageHumanAge(dogAges))

/**********
 * Coding Challenge #3
 *********/

/*
  Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
  as an arrow function, and using chaining!
  Test data:
  § Data 1: [5, 2, 4, 1, 15, 8, 3]
  § Data 2: [16, 6, 10, 5, 6, 1, 4]
  GOOD LUCK
*/
// const dogAges = [5, 2, 4, 1, 15, 8, 3]

// const calcAverageHumanAge = function(array) {
//     const humanAges = array
//       .map(dogAge => dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4)  
//       .filter( age => age >= 18)
//       .reduce((acc, age, i, arr) =>  acc + age / arr.length, 0)
  
//     console.log(humanAges);
// }
// calcAverageHumanAge(dogAges)


/**********
 * Coding Challenge #4
 *********/

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/


const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

// 1. Store the average weight of a "Husky" in a variable "huskyWeight"
// const huskyWeight = breeds.find(dog => dog.breed === 'Husky').averageWeight;

// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
// const dogBothActivities = breeds
  // .find((dog) => dog.activities.includes('fetch') && dog.activities.includes('running'))

// 3. Create an array "allActivities" of all the activities of all the dog breeds
// const allActivities = breeds.flatMap( (dog) => dog.activities )

// 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). 
// const uniqueActivities = [...new Set(allActivities)]

// 5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
// const swimmingAdjacent = [...new Set(breeds
//   .filter((breed) => breed.activities.includes('swimming'))
//   .flatMap((breed) => breed.activities))]
//   .filter((activity) => activity !== 'swimming')
  
// console.log(swimmingAdjacent);

// 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
// breeds.forEach((breed) => breed.averageWeight >= 10 ? console.log('true') : console.log('false'));
// breeds.every((breed) => breed.averageWeight >= 10 ? console.log('true') : console.log('false'));

// 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".
// breeds.forEach((breed) => breed.activities.length >= 3 ? console.log('true') : console.log('false'));
// console.log(breeds.some((breed) => breed.activities.length >= 3 ));

// BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

// const fetchBreeds = breeds.filter((breed) => breed.activities.includes('fetch') )
// const averageWeightFetch = filterFetch.reduce((acc, value) => (acc + value.averageWeight) / fetchBreeds.length, 0)

// const averageWeightFetch = breeds
//   .filter((breed) => breed.activities.includes('fetch') )
//   .map((breed) => breed.averageWeight )
// const heaviestDog = Math.max(...averageWeightFetch);

// const averageWeightFetch = Math.max(...breeds
//   .filter((breed) => breed.activities.includes('fetch') )
//   .map((breed) => breed.averageWeight ))
  
// console.log(Math.max(averageWeightFetch));

/**********
 * Coding Challenge #5
 *********/

/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)

// 1.
dogs.forEach((dog) => {
  // adding item to dogs object
  const recommendedFood = (dog.weight ** 0.75 * 28);
  dog.recommendedFood = Math.floor(recommendedFood);
  // loging result to see the truth
  // console.log(dog.recommendedFood, '----', dog.curFood);
  // console.log(dog.recommendedFood * 0.9, '---' , dog.curFood ,  '---', dog.recommendedFood * 1.1 );
})
console.log(dogs);

// 2.
const dogSarah = dogs.find((dog) => dog.owners.includes('Sarah'))
console.log(`Sarah's dog eats too ${dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'}`);
// // condition to see if the current food is to low or high
// if (dogSarah.recommendedFood * 0.9 > dogSarah.curFood) {
//   console.log('Your dog does not eat enough ⬇️');
// } else if (dogSarah.recommendedFood * 1.1 < dogSarah.curFood ) {
//   console.log('Your dog eats to much ⬆️');
// } else {
//   console.log('Your dog eats enough ✅');
// }


// 3.
let ownersEatTooMuch = dogs
  .filter( (el) => el.curFood > el.recommendedFood)
  .flatMap((object) => object.owners)

let ownersEatTooLittle = dogs
  .filter( (el) => el.curFood < el.recommendedFood)
  .flatMap((object) => object.owners)

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much, ${ownersEatTooLittle.join(' and ')} dogs eat to little`);


// 5.
console.log(dogs.some( (dog) => dog.curFood === dog.recommendedFood));

// 6. 
console.log(dogs.every( (dog) => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10)));

// 7.
const eatingOkay = dogs.filter((dog) => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10))
console.log(eatingOkay);

// 8 group
const dogsGroupedByFood = Object.groupBy(dogs, (dog) => {
  if (dog.curFood < (dog.recommendedFood * 0.90)) {
    return 'too-little'
  } else if (dog.curFood > (dog.recommendedFood * 1.10)) {
    return 'too-much'
  } else {
    return 'exact'
  }
})

console.log(dogsGroupedByFood);

// 9.
const dogsGroupedByOwners = Object.groupBy(dogs, (dog) => {
  return `${dog.owners.length}--owners`
})

console.log(dogsGroupedByOwners);

// 10 Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

const dogsSorted = dogs.toSorted( (a, b) => a.recommendedFood - b.recommendedFood)

console.log(dogsSorted);
console.log(dogs);