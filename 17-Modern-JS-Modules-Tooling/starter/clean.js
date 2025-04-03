const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// you can still change elements of the existing data but not add new data.
// budget[0].value = 20435

// immutable data (also working for arrays because it's also an object).
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// spendingLimits.jay = 1300;
// console.log(spendingLimits);

// spendingLimits?.[user] ?? 0
const getLimit = (limits, user) => limits[user] ? limits[user] : 0

const addExpanse = function (state, limit, value, description, user = 'Jonas') {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limit, cleanUser) ? [...state, { value: -value, description, user: cleanUser}] : state;
};
const addedEx1 = addExpanse(budget, spendingLimits, 10, 'Pizza 🍕');
const addedEx2 = addExpanse(addedEx1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
const addedEx3 = addExpanse(addedEx2, spendingLimits, 200, 'Stuff', 'Jay');

console.group('Add expanse result')

console.log('addedEx1:', addedEx1);
console.trace('Trace after addedEx1');

console.log('addedEx2:', addedEx2);
console.trace('Trace after addedEx2');

console.log('addedEx3:', addedEx3);
console.trace('Trace after addedEx3');

console.groupEnd()

// old code with mutation (bad)
// const addExpanse = function (value, description, user = 'Jonas') {
//   if (!user) user = 'jonas';
//   user = user.toLowerCase();

//   // const limit = spendingLimits?.[user] ?? 0
//   const limit = getLimit(user)

//   if (value <= limit) {
//     budget.push({ value: -value, description, user});
//   }
// };
// addExpanse(10, 'Pizza 🍕');
// addExpanse(100, 'Going to movies 🍿', 'Matilda');
// addExpanse(200, 'Stuff', 'Jay'); 


const checkExpanses = function (state, limit) {
  return state.map(entry => entry.value < -getLimit(limit, entry.user) ? { ...entry, flag: 'limit' } : entry);
};
const check = checkExpanses(addedEx3, spendingLimits);
console.group('Check')
console.log(check);
console.groupEnd()

// old code with mutation (bad)
// const checkExpanses = function () {
//   for (const entry of budget) {
//     const limit = getLimit(entry.user)

//     if (entry.value < -limit) {
//       entry.flag = 'limit';
//     }
//   }
// };

// impure because of console.log(), creating somethihng
const logbigExpenses = function (state, bigLimit) {
  const output = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2)) // emoji's are 2 characters
    .join("/")
    // .reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`,'')
  console.log(output);
};
console.group('Log big expanse')
console.log(addedEx3);
logbigExpenses(addedEx3, 100)
console.groupEnd()

// const logbigExpenses = function (limit) {
//   let output = '';
//   for (const entry of budget) {
//     // Emojis are 2 chars
//     output += entry.value <= -limit ? `${entry.description.slice(-2)} / ` : '';
//   }
  
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };

