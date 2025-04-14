import icons from '../../img/icons.svg'
import View from './View.js'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination')

    _generateMarkup() {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)

        // Page 1 and there are other pages
        if(this._data.currentPage === 1) {
            return `
                <button class="btn--inline pagination__btn--next">
                    <span>Page ${this._data.currentPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `
        }
        if(this._data.currentPage === numPages) {
            return `
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page 1</span>
                </button>
            `
        }


        // page 1 and there ar No other pages
        if(this._data.currentPage === 1 && numPages === 1) {
            return ''
        }

        // Page ... wich is not the first or last page.
        if(this._data.currentPage > 1 && this._data.currentPage < numPages) {
            return `
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page 1</span>
                </button>
                <button class="btn--inline pagination__btn--next">
                    <span>Page 3</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `
        }


    }

    addHandleRenderer(handler) {
        // const btnPrev = this._parentElement.querySelector('.pagination__btn--prev') 
        // console.log(btnPrev);
        // btnPrev.addEventListener('click', function() {
        //     if(this._data === 1)  return
        //     --this._data
        //     handler()
        // })

        // const btnNext = this._parentElement.querySelector('.pagination__btn--next') 
        // console.log(btnNext);
        // btnNext.addEventListener('click', function() {
        //     ++this._data            
        //     handler()
        // })
    }
}

export default new PaginationView()