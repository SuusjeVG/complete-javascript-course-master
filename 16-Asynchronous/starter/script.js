'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const errorMessage = function(mess) {
    countriesContainer.insertAdjacentText('beforeend', mess)
    // countriesContainer.style.opacity = 1
}

const renderCountry = function(data, className = '') {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
                <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
            </div>
        </article>
    `

    countriesContainer.insertAdjacentHTML('beforeend', html)
    // countriesContainer.style.opacity = 1
}

// // with XMLHttpRequest (old way)
// const getCountryDataAndNeighbour = function(country) {
//     ///////////////////////////////////////
//     const request = new XMLHttpRequest()
//     // request.open('GET', 'https://countries-api-836d.onrender.com/countries/')
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`)
//     request.send()

//     request.addEventListener('load', function () {
//         // console.log(this.responseText);
//         const [data] = JSON.parse(this.responseText)
//         console.log(data);

//         // render country
//         renderCountry(data)

//         // neighbour country
//         const request2 = new XMLHttpRequest()
//         const neighbourCode = data.borders?.[0]
//         request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbourCode}`)
//         request2.send()

//         request2.addEventListener('load', function() {
//             const [data2] = JSON.parse(this.responseText);
//             console.log(data2);
//             renderCountry(data2, 'neighbour')
//         })
//     })
// }

// getCountryDataAndNeighbour('portugal')
// getCountryData('portugal')


// helper function for incapsulation
// const getJSON = function(url, errorMessage) {
//     return fetch(url)
//         .then(response => {
//             if (!response.ok) throw new Error(`${errorMessage}, ${response.status}`)

//             return response.json()
//         })
// }

// const getCountryDataAndNeighbour = function(country) {
//     getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Couontry not found')
//         .then(data => {
//             // destructer first object in array
//             const [country] = data;

//             // Render country
//             renderCountry(country)

//             // Neighbourcode and fetch neighbour endpoint
//             const neighbourCode = country.borders?.[0]

//             if (!neighbourCode) throw new Error(`This coountry does not have a neighbour`)

//             return getJSON(`https://restcountries.com/v3.1/alpha/${neighbourCode}`, 'Country not found')
//         })
//         .then(data => {
//             // destructer first object in array
//             const [neighbourCountry] = data;
//             renderCountry(neighbourCountry, 'neighbour')
//         })
//         .catch(err => {
//             console.error(err)
//             errorMessage(`Sorry, something went wrong! ❌ ${err.message}, Try again!`)
//         })
//         .finally(() => countriesContainer.style.opacity = 1)
// }

// btn.addEventListener('click', () => {
//     getCountryDataAndNeighbour('australia')
// })

// with fetch (new)
// const getCountryDataAndNeighbour = function(country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(response => {
//             if (!response.ok) throw new Error(`Country not found, ${response.status}`)

//             return response.json()
//         })
//         .then(data => {
//             // destructer first object in array
//             const [country] = data;

//             // Render country
//             renderCountry(country)

//             // Neighbourcode and fetch neighbour endpoint
//             const neighbourCode = country.borders?.[0]
//             return fetch(`https://restcountries.com/v3.1/alpha/${neighbourCode}`)

//             // don't do this (back to callback hell)
//             // fetch(`https://restcountries.com/v3.1/alpha/${neighbourCode}`)
//             //     .then(response => response.json())
//             //     .then(data => {
//             //         // destructer first object in array
//             //         const [neighbourCountry] = data;
//             //         renderCountry(neighbourCountry, 'neighbour')
//             // })
//         })
//         .then(response => {
//             if (!response.ok) throw new Error(`Country not found, ${response.status}`)

//             return response.json()
//         })
//         .then(data => {
//             // destructer first object in array
//             const [neighbourCountry] = data;
//             renderCountry(neighbourCountry, 'neighbour')
//         })
//         .catch(err => {
//             console.error(err)
//             errorMessage(`Sorry, something went wrong! ❌ ${err.message}, Try again!`)
//         })
//         .finally(() => countriesContainer.style.opacity = 1)
// }


////////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// Takes own IP adres if you fill in no lat or lng
// fetch('https://api.bigdatacloud.net/data/reverse-geocode-client')
//     .then(res =>  res.json())
//     .then(data => console.log(data))

// previous made functionalities
const getJSON = function(url, errorMessage) {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`${errorMessage}, ${response.status}`)

            return response.json()
        })
}

const getCountryDataAndNeighbour = function(country) {
    getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Couontry not found')
        .then(data => {
            // destructer first object in array
            const [country] = data;

            // Render country
            renderCountry(country)

            // Neighbourcode and fetch neighbour endpoint
            const neighbourCode = country.borders?.[0]

            if (!neighbourCode) throw new Error(`This coountry does not have a neighbour`)

            return getJSON(`https://restcountries.com/v3.1/alpha/${neighbourCode}`, 'Country not found')
        })
        .then(data => {
            // destructer first object in array
            const [neighbourCountry] = data;
            renderCountry(neighbourCountry, 'neighbour')
        })
        .catch(err => {
            console.error(err)
            errorMessage(`Sorry, something went wrong! ❌ ${err.message}, Try again!`)
        })
        .finally(() => countriesContainer.style.opacity = 1)
}

const getJSONLocation = function(url, errorMessage = 'Something went wrong') {
    return fetch(url)
        .then(response =>  {
            console.log(response);
            if (!response.ok) throw new Error(`${errorMessage}, status ${response.status} ❌❌`);
            
            return response.json()
        })
}

// const whereAmI = function(lat, lng) {
//     getJSONLocation(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`, 'Could not fetch location data')
//         .then(data => {
//             console.log(`You are in ${data.city}, ${data.countryName}`)
//             return getCountryDataAndNeighbour(data.countryName)
//         })
//         .catch(err => { 
//             // console.dir(err)
//             console.error(`Something went wrong! ${err.message} 😥`);
//             errorMessage(`Sorry could not find your location, ${err.message}, try again`) ;
//         })
//         .finally(() => countriesContainer.style.opacity = 1)
// }

// btn.addEventListener('click', () => {
//     whereAmI(52.508, 13.381)
// })

///////////////////////////////////////
// The Event Loop in Practice
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//     for (let i = 0; i < 1000000000; i++) {}
//     console.log(res);
//   });

// console.log('Test end');

/*  MY ANSWER:
    first: Test start (sync task first, is in the callstack)
    second: Test end (sync task first, is in the callstack)
    third: Resolved promise 1 (async but goes in microtasks queue because it's a promise)
    fourth: 0 sec timer (async but goes in callback queue but micro queue is always first)
*/


///////////////////////////////
// PROMISES

// const lotteryPromise = new Promise(function(resolve, reject) {
    
//     setTimeout(() => {
//         if (Math.random() >= 0.5) {
//             resolve({ price: 120000, status: 'You win the lottery', win: true})
//         } else {
//             reject(new Error(`You lost all your money`))
//         }
//     }, 2000);

// })

// lotteryPromise
//     .then(res => console.log(`${res.status}, win = ${res.win}`))
//     .catch(err => console.error(err))

/////////////////////////
// Promis geolocation
// navigator.geolocation.getCurrentPosition( 
//     (pos) => {console.log(pos);},
//     (err) => {console.log(err);},
//     {}
// )

// const getGeoLocation = function() {
//     return new Promise(function(resolve, reject) {
//         // navigator.geolocation.getCurrentPosition( 
//         //     (pos) => {resolve(pos);},
//         //     (err) => {reject(err);}
//         // )
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
// }

// // getGeoLocation().then(data => console.log(data))
// const whereAmI = function() {
//     getGeoLocation()
//         .then(location => {
//             const {latitude: lat, longitude: lng} = location.coords

//             getJSONLocation(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`, 'Could not fetch location data')
//         .then(data => {
//             console.log(`You are in ${data.city}, ${data.countryName}`)
//             return getCountryDataAndNeighbour(data.countryName.split(" ")[0])
//         })
//         .catch(err => { 
//             // console.dir(err)
//             console.error(`Something went wrong! ${err.message} 😥`);
//             errorMessage(`Sorry could not find your location, ${err.message}, try again`) ;
//         })
//         .finally(() => countriesContainer.style.opacity = 1)
//     })
// }

// whereAmI()

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
const wait = function(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    })
}

const imageContainer = document.querySelector('.images')

const createImage = function(imgPath) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.src = imgPath

        img.addEventListener('load', function() {
            imageContainer.appendChild(this)
            resolve(img)
        })

        img.addEventListener('error', function() {
            reject(new Error('Image not loaded'))
        })
    })
}

let currentImage;

createImage('./img/img-1.jpg')
    .then(img =>  {
        currentImage = img
        console.log('image is loaded')
        return wait(2)
    })
    .then(() => {
        currentImage.style.display = 'none'
        return wait(2)
    })
    .then(() => {
        currentImage.style.display = 'block'
        createImage('./img/img-2.jpg')
        return wait(2)
    })
    .then(() => {
        currentImage.style.display = 'none'
        return wait(2)
    })
    .then(() => {
        currentImage.style.display = 'block'
        createImage('./img/img-3.jpg')
        return wait(2)
    })
    .then(() => {
        currentImage.style.display = 'none'
        return wait(2)
    })
    .catch(err => console.error(err))