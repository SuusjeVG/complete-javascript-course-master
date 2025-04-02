///////////////////////////////////////
// Exporting and Importing in ES6 Modules

// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

console.log('Importing module');
// console.log(shippingCost);

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log(price);

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);
/*


///////////////////////////////////////
// Top-Level Await (ES2022)

// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

// Not very clean
// lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);


///////////////////////////////////////
// The Module Pattern

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);


///////////////////////////////////////
// CommonJS Modules
// Export
export.addTocart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
  );
};

// Import
const { addTocart } = require('./shoppingCart.js');
*/

//////////////////////
// Introducing NPM
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
      cart: [
            { product: 'bread', quintity: 5 },
            { product: 'pizza', quintity: 3 }
      ],
      user: { loggedIn: true }
}

const stateCopy = Object.assign({}, state)
const stateCloneDeep = cloneDeep(state);
state.user.loggedIn = false
console.log('Normal copy: ', stateCopy);
console.log('Lodash copy: ', stateCloneDeep);
console.log('peop he');

// fetch('https://jsonplaceholder.typicode.com/todos/1')
//       .then(response => response.json())
//       .then(json => console.log(json))

//       const hello = 'test'

// hot module relode (doesn't reload the page on refresh when local server is on)
if (module.hot) {
      module.hot.accept();
}

// new methods from ES6, wich Parcel can't build back to ES5
console.log(cart.find(el => el.product === 'bread'));
Promise.resolve('TEST').then(t => console.log(t))

// for Polifilling new methods or obejcts. Parcel only does syntax.
import 'core-js/actual';
// import 'core-js/actual/array/find';
// import 'core-js/actual/promise';

// Polifilling for async functions
import 'regenerator-runtime/runtime'