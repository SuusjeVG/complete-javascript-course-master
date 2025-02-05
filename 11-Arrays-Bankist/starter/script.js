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

const btnLogin = document.querySelector('.login__btn');
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
const displayMovements = function (movements) {
  // destroy first html elements
  containerMovements.innerHTML = "";

  movements.forEach((item, i) => {
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

displayMovements(account1.movements)

// calc and display total balance
const calcDisplayBalance = function(movements) {
  const balance = movements.reduce( (acc, value) => {
    return acc + value
  }, 0)

  labelBalance.innerText = ` ${balance.toString()} EUR `
}
calcDisplayBalance(account1.movements)

//display the summery
const calcDisplaySummery = function (movements) {
  // total deposit
  const deposits = movements.filter((value) => {
    return value > 0 
  })
  const totalIn = deposits.reduce((acc, value) => {
    return acc + value
  }, 0)

  labelSumIn.textContent = `${totalIn}€`

  // total withdrawaks
  const withdrawals = movements.filter((value) => {
    return value < 0 
  })
  const totalOut = withdrawals.reduce((acc, value) => {
    return acc + value
  }, 0)
  labelSumOut.textContent = `${Math.abs(totalOut)}€`

  const interest = deposits
    .map(value => value * 1.2/100)
    .filter(value => value >= 1 )
    .reduce((acc, value) => {
      return acc + value
    }, 0)

  labelSumInterest.textContent = `${interest}€`
}

calcDisplaySummery(account1.movements) 
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
// console.log(accounts);



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
const dogAges = [5, 2, 4, 1, 15, 8, 3]

const calcAverageHumanAge = function(array) {
    const humanAges = array
      .map(dogAge => dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4)  
      .filter( age => age >= 18)
      .reduce((acc, age, i, arr) =>  acc + age / arr.length, 0)
  
    console.log(humanAges);
}
calcAverageHumanAge(dogAges)