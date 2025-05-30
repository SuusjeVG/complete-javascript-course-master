import { API_url, KEY, RES_PER_PAGE } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        currentPage: 1,
        resultsPerPage: RES_PER_PAGE
    },
    bookmarks: []
}

export const createRecipeObject = function(data) {
    const {recipe} = data.data;

    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        source: recipe.source_url,
        image: recipe.image_url, 
        cookingTime: recipe.cooking_time,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key}), // if recipe.key exist adds a key to the object
    }
    
}

export const loadRecipe = async function(id) {
    try {
        const data = await AJAX(`${API_url}${id}?key=${KEY}`)

        // 3) format data
        state.recipe = createRecipeObject(data)

        // add bookmark property 
        if (state.bookmarks.some(bookmark => bookmark.id === id)) 
            state.recipe.bookmarked = true
        else
            state.recipe.bookmarked = false

        // console.log(state.recipe);

    } catch (err) {
        console.error(err.message, '❌❌' )
        throw err;
    }
   
}

export const loadSearchResults = async function(query) {
    try {
        const data = await AJAX(`${API_url}?search=${query}&key=${KEY}`)

        state.search.query = query;
        state.search.results = data.data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url, 
                ...(recipe.key && { key: recipe.key}),
            }
        })

        // reset page to 1
        state.search.currentPage = 1;
        // console.log(state.search.result);
    } catch (err) {
        console.error(err.message, '❌❌' )
        throw err;
    }
}

export const getSearchResultsPage = function(page = state.search.currentPage) {
    state.search.currentPage = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * 10;

    return state.search.results.slice(start, end)
}

export const updateServings = function(newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
     })

    state.recipe.servings = newServings;
}

export const uploadRecipe = async function(newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== "")
            .map(ing => {
                // const ingArr = ing[1].replaceAll(' ', '').split(',');
                const ingArr = ing[1].split(',').map(el => el.trim());
                if(ingArr.length !== 3) throw new Error('Wrong ingredient format! Please use the correct format :)');
                const [quantity, unit, description] = ingArr;
                return {quantity: quantity ? +quantity : null, unit, description}
            })

        const recipe = {
            // id: newRecipe.id,
            title: newRecipe.title,
            publisher: newRecipe.publisher,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image, 
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients
        }

        const data = await AJAX(`${API_url}?key=${KEY}`, recipe)

        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe)
    } catch (err) {
        throw err;
    }
}


// Local storage
const persistBookmarks = function() {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addBookmark = function(recipe) {
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks()
}

export const deleteBookmark = function(id) {
    // Delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id)
    state.bookmarks.splice(index, 1)

    // Mark current recipe as bookmark
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks()
}

const init = function() {
    const storage = localStorage.getItem('bookmarks');

    if (storage) state.bookmarks = JSON.parse(storage)
}
// init()

// only if needed
const clearBookmarks = function() {
    localStorage.clear('bookmarks')
}
clearBookmarks()
console.log(state.bookmarks);
