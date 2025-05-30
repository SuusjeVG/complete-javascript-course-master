import View from './View.js'
import previewView from './PreviewView.js';

class BookmarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No bookmarks yet, find a nice recipe and bookmark it!';
    _message = ' ';

    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark, false) ).join('')
    }

    addHandlerRender(handler) {
        window.addEventListener('load', handler)
    }

}

export default new BookmarkView()