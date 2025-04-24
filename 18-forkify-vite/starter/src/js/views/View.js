import icons from '../../img/icons.svg'

export default class View {
    _data;

    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        // console.log(data);
        this._data = data
        const markup = this._generateMarkup()

        if(!render) return markup;

        this.#clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderSpinner() {
        const markup = `
            <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
            </div>
        `
        this.#clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p> ${message} </p>
            </div>
        `
        this.#clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderMessage(message = this._message) {
        const markup = `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p> ${message} </p>
            </div>
        `
        this.#clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    update(data) {
        // if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data
        const newMarkup = this._generateMarkup()

        // lives in page not in memory
        const newDom = document.createRange(). createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'))
        const currElements = Array.from(this._parentElement.querySelectorAll('*'))

        newElements.forEach((newEl, i) => {
            const currEl = currElements[i];
            // console.log(currEl, newEl.isEqualNode(currEl));

            // update changed text
            if(!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                currEl.textContent = newEl.textContent
            }

            // update changed attributes
            if(!newEl.isEqualNode(currEl)) {
                // console.log(newEl.attributes);
                Array.from(newEl.attributes).forEach(attr => {
                    currEl.setAttribute(attr.name, attr.value)
                })
            }
        })

    }

    #clear() {
        this._parentElement.innerHTML = ''
    }


}

