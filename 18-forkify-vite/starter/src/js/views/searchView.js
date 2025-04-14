class SearchView {
    #parentEl = document.querySelector('.search')

    getQuery() {
        const query = this.#parentEl.querySelector('.search__field').value 
        this.#clearOutput();
        return query
    }

    #clearOutput() {
        this.#parentEl.querySelector('.search__field').value = ''
    }

    addHandleSearch(handler) {
        this.#parentEl.addEventListener('submit', function(e) {
            e.preventDefault();
            handler()
        })
    }

}

export default new SearchView()