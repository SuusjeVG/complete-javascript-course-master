export default class Marker {
    constructor(map, workout) {
        this.map = map
        this.workout = workout

        this._renderWorkoutMarker(this.workout)
    }

    _renderWorkoutMarker(workout) {
        const marker = L.marker(workout.coords)
            .addTo(this.map)
            .bindPopup(
                L.popup({
                    maxWidth: 250, 
                    minWidth: 100, 
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`
                }))
            .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.discription} `)
            .openPopup();

        workout.marker = marker
    }
}