import icons from '../../img/icons.svg'

class ResultView {
    #parentElement = document.querySelector('.results');
    #data;
    #errorMessage = 'We could not find that food, please try another one!';
    #message = ' ';

    render(data) {
        this.#data = data
        const markup = this.#generateMarkup()
 
        this.#clear()
        this.#parentElement.insertAdjacentHTML('afterbegin', markup)
    }
    
    renderError(message = this.#errorMessage) {
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
        this.#parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderMessage(message = this.#message) {
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
        this.#parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    #clear() {
        this.#parentElement.innerHTML = ''
    }

    #generateMarkup() {
        return this.#data.map((result) => {
            return `
                <li class="preview">
                    <a class="preview__link preview__link--active" href="#${result.id}">
                        <figure class="preview__fig">
                            <img src="${result.image}" alt="${result.title}" />
                        </figure>
                        <div class="preview__data">
                            <h4 class="preview__title"> ${result.title} </h4>
                            <p class="preview__publisher">${result.publisher}</p>
                            <div class="preview__user-generated">
                                <svg>
                                    <use href="${icons}#icon-user"></use>
                                </svg>
                            </div>
                        </div>
                    </a>
                </li>
            `
        }).join('');
    }

}

export default new ResultView()