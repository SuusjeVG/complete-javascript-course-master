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
budget[0].value = 20435


// immutable data (also working for arrays because it's also an object).
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// spendingLimits.jay = 1300;
// console.log(spendingLimits);

// spendingLimits?.[user] ?? 0
const getLimit = user => spendingLimits[user] ? spendingLimits[user] : 0

const addExpanse = function (value, description, user = 'Jonas') {
  if (!user) user = 'jonas';
  user = user.toLowerCase();

  // const limit = spendingLimits?.[user] ?? 0
  const limit = getLimit(user)

  if (value <= limit) {
    budget.push({ value: -value, description, user});
  }
};
// addExpanse(10, 'Pizza 🍕');
// addExpanse(100, 'Going to movies 🍿', 'Matilda');
// addExpanse(200, 'Stuff', 'Jay');
console.log(budget);

const checkExpanses = function () {
  for (const entry of budget) {
    const limit = getLimit(entry.user)

    if (entry.value < -limit) {
      entry.flag = 'limit';
    }
  }
};
checkExpanses();

const logbigExpenses = function (limit) {
  let output = '';
  for (const entry of budget) {
    // Emojis are 2 chars
    output += entry.value <= -limit ? `${entry.description.slice(-2)} / ` : '';
  }
  
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
console.log(budget);

logbigExpenses(100)