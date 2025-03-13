import Running from "./Running.js";
import Cycling from "./Cycling.js";
import Marker from "./Marker.js"

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const deleteAllButton = document.querySelector('.delete__all');

let number = 1;

export default class App {
    #map;
    #mapZoomLevel = 13
    #mapEvent;
    #workouts = []

    constructor() {
        // get users position and load map
        this._getPosition()

        // get data from Localstorage
        // this._getLocalStorage()

        // Attach event handlers 
        inputType.addEventListener('change', this._toggleElevationField)
        form.addEventListener('submit', this._newWorkout.bind(this))
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this))
        containerWorkouts.addEventListener('click', this._deleteWorkout.bind(this))
        deleteAllButton.addEventListener('click', this.reset)
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

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.on('click', this._showForm.bind(this))

        // after the map is loaded, load the markers with local storage data
        // this.#workouts.forEach(work => {
        //     this._renderWorkoutMarker(work)
        // })
    }

    _showForm(e) {
        this.#mapEvent = e
        form.classList.remove('hidden')
        inputDistance.focus()
    }

    _hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''  
        // form.style.display = 'none'
        form.classList.add('hidden')
        // setTimeout(() => form.style.display = 'grid', 1000)
    }

    _toggleElevationField() {
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    }

    _newWorkout(e) {
        // Helper functions (Check how you write the function and that you return it)
        const validate = (...inputs) => inputs.every( inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every( inp => inp > 0 );

        // prevent reloading
        e.preventDefault();

        // map event data 
        const {lat, lng} = this.#mapEvent.latlng
        const coords = [lat, lng]
        //get the input data
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        let workout;
        
        // if workout is running create new object
        if (type === 'running') {
            const cadence = +inputCadence.value;

            // check if data is valid
            if (!validate(distance, duration, cadence) || !allPositive(distance, duration, cadence) ) {
                this._hideForm()
                return alert(`The input has to be positive numbers`)
            }

            // Create new object and push in the workout array
            workout = new Running(coords, distance, duration, cadence)
        }

        // if workout is cycling creat new Object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;

            // check if data is valid
            if (!validate(distance, duration, elevation) || !allPositive(distance, duration)) {
                this._hideForm()
                return alert(`The input has to be positive numbers`)
            }

            workout = new Cycling(coords, distance, duration, elevation)
        }

        this.#workouts.push(workout)

        // Render workout to container
        this._renderWorkout(workout)

        // Render new object as marker
        const marker = new Marker(this.#map, workout)
        // this._renderWorkoutMarker(workout)
        
        // clear the input fields and hide the form
        this._hideForm()

        // Set local storage to all added workouts
        // this._setLocalStorage()
        console.log(this.#workouts);
    }

    // _renderWorkoutMarker(workout) {
    //     const marker = L.marker(workout.coords)
    //         .addTo(this.#map)
    //         .bindPopup(
    //             L.popup({
    //                 maxWidth: 250, 
    //                 minWidth: 100, 
    //                 autoClose: false,
    //                 closeOnClick: false,
    //                 className: `${workout.type}-popup`
    //             }))
    //         .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.discription} `)
    //         .openPopup();

    //     workout.marker = marker
    // }

    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
                <div class="workout__buttons">
                    <button class="edit__workout"> Edit </button>
                    <span class="delete__workout" data-id="${workout.id}"> ❌</span>
                </div>
                <h2 class="workout__title"> ${workout.discription}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>

        `
        if(workout.type === 'running') {
            html += `
                    <div class="workout__details">
                        <span class="workout__icon">⚡️</span>
                        <span class="workout__value">${workout.pace.toFixed(1)}</span>
                        <span class="workout__unit">min/km</span>
                    </div>
                    <div class="workout__details">
                        <span class="workout__icon">🦶🏼</span>
                        <span class="workout__value">${workout.cadence}</span>
                        <span class="workout__unit">spm</span>
                    </div>
                </li>
            `
        }

        if(workout.type === 'cycling') {
            html += `
                    <div class="workout__details">
                        <span class="workout__icon">⚡️</span>
                        <span class="workout__value">${workout.speed.toFixed(1)}</span>
                        <span class="workout__unit">min/km</span>
                    </div>
                    <div class="workout__details">
                        <span class="workout__icon">⛰</span>
                        <span class="workout__value">${workout.elevationGain}</span>
                        <span class="workout__unit">m</span>
                    </div>
                </li>
            `
        }


        form.insertAdjacentHTML('afterend', html)
    }

    _deleteWorkout(e) {
        const clicked = e.target.closest('.delete__workout')

        if (!clicked) return

        const id = clicked.dataset.id;
        const clickedWorkoutIndex = this.#workouts.findIndex((work) => work.id === id);

        setTimeout(() => {
            // remove marker
            this.#map.removeLayer(this.#workouts[clickedWorkoutIndex].marker)
            // delete targeted workout from array
            this.#workouts.splice(clickedWorkoutIndex, 1)

            // remove from local storage
            // this._setLocalStorage()
            // this._getLocalStorage()

            // Delete workout from the DOM
            clicked.closest('.workout').remove()
        }, 1000);
     
    }

    _moveToPopup(e) {
        const clicked = e.target.closest('.workout')

        if (!clicked) return

        const id = clicked.dataset.id;
        const clickedWorkout = this.#workouts.find(work => work.id === id);

        this.#map.flyTo(clickedWorkout.coords, this.#mapZoomLevel)

        // clickedWorkout._click() // API method from the workout class
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts))
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'))

        if(!data) return

        this.#workouts = data;

        this.#workouts = data.map(work => {
            if (work.type === 'running') return Object.assign(new Running(), work);
            if (work.type === 'cycling') return Object.assign(new Cycling(), work);
        });

        // render workouts in list
        this.#workouts.forEach(work => {
            this._renderWorkout(work)
        })
    }

    reset() {
        localStorage.removeItem('workouts');
        location.reload()
    }
}