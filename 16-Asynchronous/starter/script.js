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
            if (!response.ok) throw new Error(`${errorMessage}, status ${response.status}`);
            
            return response.json()
        })
}

const whereAmI = function(lat, lng) {
    getJSONLocation(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`, 'Could not fetch location data')
        .then(data => {
            console.log(data);
            return getCountryDataAndNeighbour(data.countryName)
        })
        .catch(err => { 
            console.error(`Something went wrong! ${err.message}`);
            errorMessage(`Sorry could not find your location, ${err.message}, try again`) ;
        })
        .finally(() => countriesContainer.style.opacity = 1)
}

btn.addEventListener('click', () => {
    whereAmI(52.508, 13.381)
})
