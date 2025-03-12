import Running from "./Running.js";
import Cycling from "./Cycling.js";

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let number = 1;

export default class App {
    #map;
    #mapEvent;
    #workouts = []

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
        // Helper functions (Check how you write the function and that you return it)
        const validate = (...inputs) => inputs.every( inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every( inp => inp > 0 );
        const hideForm = () => {
            inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''
            form.classList.add('hidden')
        }

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
                hideForm()
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
                hideForm()
                return alert(`The input has to be positive numbers`)
            }

            workout = new Cycling(coords, distance, duration, elevation)
        }

        this.#workouts.push(workout)

        // console.log(this.#workouts);

        // Render workout to container
        this.renderWorkout(workout)

        // Render new object as marker
        this._renderWorkoutMarker(workout)
        
        // clear the input fields and hide the form
        hideForm()
    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(
            L.popup({
                maxWidth: 250, 
                minWidth: 100, 
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            }))
        .setPopupContent(`${workout.type}: ${number++}`)
        .openPopup();
    }

    renderWorkout(workout) {
        console.log(workout.date);
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
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


        containerWorkouts.insertAdjacentHTML('beforeend', html)
    }
}