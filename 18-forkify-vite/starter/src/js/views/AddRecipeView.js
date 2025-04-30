import View from './View.js'

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was succesfully uploaded! 🤗'
    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor() {
        super()
        this._addHandlerShowWindow()
        this._addHandlerHideWindow()
    }
    // _generateMarkup() {

    // }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault()

            const formData = [...new FormData(this)]; 
            const data = Object.fromEntries(formData);
            handler(data)
        })
    }

    toggleWindow() {
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden')
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    _addHandlerHideWindow() {
        this._overlay.addEventListener('click', this.toggleWindow.bind(this))
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
    }



}

export default new AddRecipeView()