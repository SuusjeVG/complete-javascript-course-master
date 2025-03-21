'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-04-01T10:17:24.185Z',
    '2024-05-08T14:11:59.604Z',
    '2025-02-15T17:01:17.194Z',
    '2025-02-19T23:36:17.929Z',
    '2025-02-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'nl-NL', // de-DE, pt-PT, es-ES, fr-FR
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2023-11-01T13:15:33.035Z',
    '2023-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2024-01-25T14:18:46.235Z',
    '2024-02-05T16:33:06.386Z',
    '2024-04-10T14:43:26.374Z',
    '2024-06-25T18:49:59.371Z',
    '2024-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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


let currentAccount, timer;

/////////////////
// current date
const currentDate = new Date();
const optionsDate = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  // weekday: 'long'
}

// const day = `${currentDate.getDate()}`.padStart(2, '0');
// const month = `${currentDate.getMonth() + 1}`.padStart(2, '0');
// const year = currentDate.getFullYear();
// const hours = `${currentDate.getHours()}`.padStart(2, '0')
// const minutes = `${currentDate.getMinutes()}`.padStart(2, '0');
// const dateString = `${day}/${month}/${year}, ${hours}:${minutes}`



/////////////////////////////////////////////////
// Functions
const calcDaysPast = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

const displayMovDate = function(dateStr) {
  // date of movements
  const date = new Date(dateStr)
  const daysPast = calcDaysPast(new Date(), date)

  if (daysPast  === 0) return 'Today'
  if (daysPast  === 1) return 'Yesterday'
  if (daysPast <= 7 ) return `${daysPast} days ago`
  else {
    // const day = `${date.getDate()}`.padStart(2, '0');
    // const month = `${date.getMonth() + 1}`.padStart(2, '0');
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`

    // with the formatter API for different languages
    return new Intl.DateTimeFormat(
      currentAccount.locale, 
      { day: '2-digit', 
        month: '2-digit', 
        year: 'numeric'
      }).format(date)
  }
}

const formatCurr = function(locale, currency, value) {
  return new Intl.NumberFormat(locale, {style: 'currency', currency: currency}).format(value)
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combineMovsDate = acc.movements.map((mov, i) => {
    return {movement: mov, date: acc.movementsDates[i]}
  })

  // const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  if (sort) combineMovsDate.sort((a, b) => a.movement - b.movement)

  combineMovsDate.forEach(function (obj, i) {
    const {movement: mov, date: movementsDate} = obj
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const displayDate = displayMovDate(movementsDate)
    const formatedMov = formatCurr(acc.locale, acc.currency, mov)

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatedMov}</div>
      </div>
    `;

    // my solution
    // <div class="movements__date">${acc.movementsDates[i].slice(0, 10).replaceAll('-', '/')}</div>

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  
  labelBalance.textContent = `${formatCurr(acc.locale, acc.currency, acc.balance) }`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCurr(acc.locale, acc.currency, incomes)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCurr(acc.locale, acc.currency, Math.abs(out))}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCurr(acc.locale, acc.currency, interest)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const logoutTimer = function () {
  // 5 min
  let time = 120

  const tick = () => {
    // calculate only the total FULL minutes so decimal points wil be cut off because those are the seconds and they will be calculated with the remainer calculation
    const min = String(Math.trunc(time / 60)).padStart(2, '0')
    // remainder of the time converted to string (those are the seconds)
    const sec = String(time % 60).padStart(2, '0')

    labelTimer.textContent = `${min}:${sec}`

    // first check before decreasing
    if (time === 0)  {
      clearInterval(timer)
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    time--

  }

  tick()
  const timer = setInterval(tick, 1000)

  return timer
}


///////////////////////////////////////
// Event handlers
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // add current time to label and locals
    // labelDate.textContent = new Intl.DateTimeFormat(navigator.languege, optionsDate).format(currentDate)
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, optionsDate).format(currentDate)


    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // start timer
    if (timer) clearInterval(timer)
    timer = logoutTimer()

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Adding date of transfer
    currentAccount.movementsDates.push(currentDate.toISOString())
    receiverAcc.movementsDates.push(currentDate.toISOString())

    // Update UI
    updateUI(currentAccount);

    // reset timer
    clearInterval(timer)
    timer = logoutTimer()
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(currentDate.toISOString())
    
    setTimeout(( ) => {
      // Update UI
      updateUI(currentAccount);
    }, 2000)

    // reset timer
    clearInterval(timer)
    timer = logoutTimer()
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////
// conventions in javascript
// console.log(0.1 + 0.2);

///////////////////////////
// Math and rounding
// const randomInt = function (min, max) {
//   const difference = (max - min) + 1;

//   const random = Math.floor((Math.random() * difference) + min)
//   return random
// }

// console.log(randomInt(2, 10));

// 
// console.log(Math.round(22.49));
// console.log(Math.round(22.5));

////////////////////////
// The remainder

// als het deelbaar is door 2 dan is het een even getal
// console.log(8 % 2); // 2 + 2 + 2 + 2 = 8 dus ramainder is 0
// console.log(8 / 2); // 4. Dus 2 past 4 keer in 8

// console.log(8 % 3); // 3 + 3 = 6 dus remainder is 2
// console.log(8 / 3); // is niet een geheel getal dus dan heb je een remainder

// function to check if a number is odd or even
// const isEven = function(numb) {
//   if (numb % 2 === 0) {
//     console.log(`${numb} is even`);
//   } else {
//     console.log(`${numb} is odd`);
//   }
// }

// isEven(3)
// isEven(9)

///////////////////////////////////////
// Working with BigInt
// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);
// console.log(2 ** 53 + 1);
// console.log(2 ** 53 + 2);
// console.log(2 ** 53 + 3);
// console.log(2 ** 53 + 4);

// console.log(4838430248342043823408394839483204n);
// console.log(BigInt(48384302));

// // Operations
// console.log(10000n + 10000n);
// console.log(36286372637263726376237263726372632n * 10000000n);
// // console.log(Math.sqrt(16n));

// const huge = 20289830237283728378237n;
// const num = 23;
// console.log(huge * BigInt(num));

// // Exceptions
// console.log(20n > 15);
// console.log(20n === 20);
// console.log(typeof 20n);
// console.log(20n == '20');

// console.log(huge + ' is REALLY big!!!');

// // Divisions
// console.log(11n / 3n);
// console.log(10 / 3);

///////////////////
// Date

/////////////////////////
// settimout and interval

// make timer (with dom element)
// let time = 0
// setInterval(() => {
//   let now = new Date()
//   let formatDate = new Intl.DateTimeFormat('en-GB', {hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(now)

//   document.querySelector('#time').textContent = `${formatDate}`
//   console.log(formatDate);
// }, 1000)



