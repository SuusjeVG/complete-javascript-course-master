'use strict';
import App from "./App.js";

const mapty = new App();

// class Workout {
//     id = (Date.now() + '').slice(-10)
//     date = new Date()

//     constructor(coords, distance, duration) {
//         this.coords = coords; // [lat, lng]
//         this.distance = distance; // km
//         this.duration = duration; // min
//     }

// }

// class Running extends Workout{
//     type = 'running'

//     constructor(coords, distance, duration, cadence) {
//         super(coords, distance, duration)
//         this.cadence = cadence
//         this.calcPace()
//     }

//     calcPace() {
//         // min / km
//         this.pace = this.duration / this.distance;
//         return this.pace
//     }

// }
// class Cycling extends Workout{
//     type = 'cycling'

//     constructor(coords, distance, duration, elevationGain) {
//         super(coords, distance, duration)
//         this.elevationGain = elevationGain
//         this.calcSpeed()
//     }

//     calcSpeed() {
//         // km/h
//         this.speed = this.distance / (this.duration / 60)
//         return this.speed
//     }
// }

// const run = new Running([39, -12], 10, 24, 178)
// const cycle = new Cycling([39, -12], 20, 35, 523)
// console.log(run);
// console.log(cycle);

//////////////////////////////
// APPLICATION ARCHITECTURE
// class App {
//     #map;
//     #mapEvent;
//     #workouts = []

//     constructor() {
//         this._getPosition()

//         inputType.addEventListener('change', this._toggleElevationField)
//         form.addEventListener('submit', this._newWorkout.bind(this))
//     }

//     _getPosition() {
//         const options = {
//             enableHighAccuracy: true,
//             timeout: 5000,
//             maximumAge: 0,
//         }
        
//         if(navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 this._loadMap.bind(this),
//                 (err) => {
//                     console.log(err);
//                 },
//                 options
//             )
//         }
      
//     }

//     _loadMap(pos) {
//         const {latitude: lat, longitude: lng} = pos.coords;
//         const coords = [lat, lng];

//         this.#map = L.map('map').setView(coords, 13);
//         // console.log(this);
//         L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         }).addTo(this.#map);

//         this.#map.on('click', this._showForm.bind(this))
//     }

//     _showForm(e) {
//         this.#mapEvent = e
//         form.classList.remove('hidden')
//         inputDistance.focus()
//     }

//     _toggleElevationField() {
//         inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
//         inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
//     }

//     _newWorkout(e) {
//         // Helper functions (Check how you write the function and that you return it)
//         const validate = (...inputs) => inputs.every( inp => Number.isFinite(inp));
//         const allPositive = (...inputs) => inputs.every( inp => inp > 0 );
//         const hideForm = () => {
//             inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''
//             form.classList.add('hidden')
//         }

//         // prevent reloading
//         e.preventDefault();

//         // map event data 
//         const {lat, lng} = this.#mapEvent.latlng
//         const coords = [lat, lng]
//         //get the input data
//         const type = inputType.value;
//         const distance = +inputDistance.value;
//         const duration = +inputDuration.value;
//         let workout;
        
//         // if workout is running create new object
//         if (type === 'running') {
//             const cadence = +inputCadence.value;

//             // check if data is valid
//             if (!validate(distance, duration, cadence) || !allPositive(distance, duration, cadence) ) {
//                 hideForm()
//                 return alert(`The input has to be positive numbers`)
//             }

//             // Create new object and push in the workout array
//             workout = new Running(coords, distance, duration, cadence)
//         }

//         // if workout is cycling creat new Object
//         if (type === 'cycling') {
//             const elevation = +inputElevation.value;

//             // check if data is valid
//             if (!validate(distance, duration, elevation) || !allPositive(distance, duration)) {
//                 hideForm()
//                 return alert(`The input has to be positive numbers`)
//             }

//             workout = new Cycling(coords, distance, duration, elevation)
//         }

//         this.#workouts.push(workout)

//         // console.log(this.#workouts);

//         // Add workout to container
//         this.renderWorkout(workout)

//         // Render new object as marker
//         this._renderWorkoutMarker(workout)
        
//         // clear the input fields and hide the form
//         hideForm()
//     }

//     _renderWorkoutMarker(workout) {
//         L.marker(workout.coords)
//         .addTo(this.#map)
//         .bindPopup(
//             L.popup({
//                 maxWidth: 250, 
//                 minWidth: 100, 
//                 autoClose: false,
//                 closeOnClick: false,
//                 className: `${workout.type}-popup`
//             }))
//         .setPopupContent(`${workout.type}: ${number++}`)
//         .openPopup();
//     }

//     renderWorkout(workout) {
//         let html = `
//             <li class="workout workout--${workout.type}" data-id="${workout.id}">
//                 <h2 class="workout__title">${workout.type} on ${workout.date}</h2>
//                 <div class="workout__details">
//                     <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
//                     <span class="workout__value">${workout.type === 'running' ? workout.pace : workout.speed}</span>
//                     <span class="workout__unit">km</span>
//                 </div>
//                 <div class="workout__details">
//                     <span class="workout__icon">⏱</span>
//                     <span class="workout__value">${workout.duration}</span>
//                     <span class="workout__unit">min</span>
//                 </div>
//                 <div class="workout__details">
//                     <span class="workout__icon">⚡️</span>
//                     <span class="workout__value">${workout.duration}</span>
//                     <span class="workout__unit">min/km</span>
//                 </div>

//             </li>
//         `


//         containerWorkouts.insertAdjacentHTML('beforeend', html)
//     }
// }

// const mapty = new App();


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




