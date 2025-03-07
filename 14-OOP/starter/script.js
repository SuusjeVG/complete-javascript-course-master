'use strict';

// constructor functions
const User = function(name, password, birthyear) {
    this.name = name
    this.password = password
    this.birthyear = birthyear

    // never do this
    // this.calcAge = function() {
    //     console.log(2025 - this.birthyear);
    // }
}

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const jack = new User('Jack', '1111', 1995)
const basrt = new User('Bart', '2222', 2001)

console.log(jack);
// check if it is instance of
console.log(jack instanceof User);

// prototype
// console.log(User.prototype);
User.prototype.calcAge = function() {
    console.log(2025 - this.birthyear);
}

// jack.calcAge()
// console.log(jack.__proto__);
// console.log(jack.__proto__ === User.prototype);

// console.log(User.prototype.isPrototypeOf(jack));
// console.log(User.prototype.isPrototypeOf(matilda));
// console.log(User.prototype.isPrototypeOf(User));

// // .prototyeOfLinkedObjects

// User.prototype.species = 'Homo Sapiens';
// console.log(jack.species, matilda.species);

// console.log(jack.hasOwnProperty('firstName'));
// console.log(jack.hasOwnProperty('species'));


// ///////////////////////////////////////
// // Prototypal Inheritance on Built-In Objects
// console.log(jack.__proto__);
// // Object.prototype (top of prototype chain)
// console.log(jack.__proto__.__proto__);
// console.log(jack.__proto__.__proto__.__proto__);

// console.dir(User.prototype.constructor);

// const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
// console.log(arr.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// console.log(arr.__proto__.__proto__);

// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());

// const h1 = document.querySelector('h1');
// console.dir(x => x + 1);


///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// 1.
// const Car = function(make, speed) {
//     this.make = make;
//     this.speed = speed
// }

// const bmw = new Car('BMW', 120)
// const mercedes = new Car('Mercedes', 95)

// // 2.
// Car.prototype.accelerate = function() {
//     this.speed += 10
//     console.log(`The ${this.make} new speed is ${this.speed} km/h`)
// }

// // 3.
// Car.prototype.brake = function() {
//     this.speed -= 5
//     console.log(`The ${this.make} new speed is ${this.speed} km/h`);
// }

// // 4.
// bmw.brake()
// bmw.accelerate()

// mercedes.accelerate()
// mercedes.brake()

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// 1.
// class Car {
//     constructor(make, speed) {
//         this.make = make;
//         this.speed = speed;
//     }

//     accelerate() {
//         this.speed += 10
//         console.log(`The ${this.make} new speed is ${this.speed}`);
//     }

//     brake() {
//         this.speed -= 5
//         console.log(`The ${this.make} new speed is ${this.speed}`);
//     }

//     // 2.
//     get speedUS() {
//         return this.speed / 1.6
//     }

//     // 3. convert speed US to KM
//     set speedUS(speed) {
//         this.speed = speed * 1.6;
//     }
// }

// // 4
// const ford = new Car('Ford', 120);
// const mercedes = new Car('Mercedes', 95);

// ford.accelerate()
// mercedes.brake();

// ford.speedUS = 50;
// console.log(ford);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// code from last challenge
const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
}
Car.prototype.accelerate = function() {
    this.speed += 10
    console.log(`The ${this.make} new speed is ${this.speed} km/h`)
}

Car.prototype.brake = function() {
    this.speed -= 5
    console.log(`The ${this.make} new speed is ${this.speed} km/h`);
}

// 1. 
const EV = function(make, speed, charge) {
    Car.call(this, make, speed)
    this.charge = charge;
}

// link the prototype
EV.prototype = Object.create(Car.prototype)

// 2.
EV.prototype.chargeBattery = function(chargeTo) {
    this.charge = chargeTo
};

// tesla.chargeBattery(50)
// console.log(tesla);

// 3.
EV.prototype.accelerate = function() {
    this.speed += 20
    this.charge--
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`)
}

// 4.
const tesla = new EV('Tesla', 120, 23)
tesla.chargeBattery(90)
// console.log(tesla);
tesla.brake()
tesla.accelerate()



