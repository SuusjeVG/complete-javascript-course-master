import icons from '../../img/icons.svg'
import View from './View.js'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        const currPage = this._data.currentPage;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // console.log(numPages);

        // First page
        if( currPage === 1 && numPages > 1) {
            return this._markupBtnNext(currPage)
        }
        // Last page
        if( currPage === numPages &&  currPage > 1) {
            return this._markupBtnPrev(currPage)
        }

        // Page ... wich is not the first or last page.
        if( currPage < numPages &&  currPage > 1 ) {
            return this._markupBtnNext(currPage) + this._markupBtnPrev(currPage)
        }

        // page 1 and there ar No other pages
        return ''
    }

    _markupBtnNext(currPage) {
        return `
            <button class="btn--inline pagination__btn--next" data-goTo=${currPage + 1}>
                <span>Page ${ currPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `
    }

    _markupBtnPrev(currPage) {
        return `
            <button class="btn--inline pagination__btn--prev" data-goTo=${currPage - 1}>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${ currPage - 1} </span>
            </button>
        `
    }

    addHandlerRenderer(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');

            if(!btn) return

            handler(+btn.dataset.goto)
        })
    }
}

export default new PaginationView()