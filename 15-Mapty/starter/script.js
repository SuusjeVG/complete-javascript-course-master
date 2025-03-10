'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let number = 1;

class App {
    #map;
    #mapEvent;

    constructor() {
        this._getPosition()

        inputType.addEventListener('change', this._toggleElevationField)
        form.addEventListener('submit', this._newWorkout.bind(this))
    }

    _getPosition() {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
        
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                (err) => {
                    console.log(err);
                },
                options
            )
        }
      
    }

    _loadMap(pos) {
        const {latitude: lat, longitude: lng} = pos.coords;
        const coords = [lat, lng];

        this.#map = L.map('map').setView(coords, 13);
        // console.log(this);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on('click', this._showForm.bind(this))
    }

    _showForm(e) {
        this.#mapEvent = e
        form.classList.remove('hidden')
        inputDistance.focus()
    }

    _toggleElevationField() {
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    }

    _newWorkout(e) {
        // prevent reloading
        e.preventDefault()

        // map event data 
        const {lat, lng} = this.#mapEvent.latlng
        const coords = [lat, lng]

        // add marker
        L.marker(coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250, 
                    minWidth: 100, 
                    autoClose: false,
                    closeOnClick: false,
                    className: 'running-popup'
                }))
            .setPopupContent(`Workout: ${number++}`)
            .openPopup();
        
        // clear the input fields and hide the form
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''
        form.classList.add('hidden')
    }
}

const mapty = new App();



class Workout {
    #id;

    constructor(distance, duration, coords) {
        this.distance = distance;
        this.duration = duration;
        this.coords = coords;
    }

}

class Running extends Workout{

    constructor(distance, duration, coords, cadence) {
        super(distance, duration, coords)
        this.cadence = cadence
    }

}
class Cycling extends Workout{

    constructor(distance, duration, coords) {
        this.distance = distance;
        this.duration = duration;
        this.coords = coords;
    }

}

//////////////////////////////////
// Spaghetti code first solution before refactoring in classes


// let map, mapEvent;
// const options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0,
// }

// if(navigator.geolocation) {

//     navigator.geolocation.getCurrentPosition(
//         (pos) => {
//             const {latitude: lat, longitude: long} = pos.coords
//             const coords = [lat, long]
//             // console.log(lat, long);
//             // const url = `https://www.google.com/maps/@${lat},${long}`
//             // console.log(url);

//             map = L.map('map').setView(coords, 13);

//             L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//                 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             }).addTo(map);

//             map.on('click', (e) => {
//                 mapEvent = e
//                 form.classList.remove('hidden')
//                 inputDistance.focus()
//             })
//         }, 
//         (err) => {
//             console.warn('Could not get your loaction', err)
//         }, 

//         options
//     )
// }


// form.addEventListener('submit', (e) => {
//     // prevent reloading
//     e.preventDefault()

//     // map event data 
//     const {lat, lng} = mapEvent.latlng
//     const coords = [lat, lng]

//     // add marker
//     L.marker(coords)
//         .addTo(map)
//         .bindPopup(
//             L.popup({
//                 maxWidth: 250, 
//                 minWidth: 100, 
//                 autoClose: false,
//                 closeOnClick: false,
//                 className: 'running-popup'
//             }))
//         .setPopupContent(`Workout: ${number++}`)
//         .openPopup();
    
//     // clear the input fields and hide the form
//     inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''
//     form.classList.add('hidden')
// })

// inputType.addEventListener('change', (e) => {
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden')

//     // when input is running show cadence and hide elevation
//     // if (inputType.value === 'running') {
//     //     inputCadence.closest('.form__row').classList.remove('form__row--hidden')
//     //     inputElevation.closest('.form__row').classList.add('form__row--hidden')
//     // }

//     // // when input is cycsling show elevation and hide cadence
//     // if (inputType.value === 'cycling') {
//     //     inputCadence.closest('.form__row').classList.add('form__row--hidden')
//     //     inputElevation.closest('.form__row').classList.remove('form__row--hidden')
//     // }
// })




