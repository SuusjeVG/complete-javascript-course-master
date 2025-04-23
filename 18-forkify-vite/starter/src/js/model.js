import { API_url, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

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

export const loadRecipe = async function(id) {
    try {
        const data = await getJSON(`${API_url}${id}`)

        // 3) format data
        const {recipe} = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            source: recipe.source_url,
            image: recipe.image_url, 
            cookingTime: recipe.cooking_time,
            servings: recipe.servings,
            ingredients: recipe.ingredients,
        }

        // console.log(state.recipe);

    } catch (err) {
        console.error(err.message, '❌❌' )
        throw err;
    }
   
}

export const loadSearchResults = async function(query) {
    try {
        const data = await getJSON(`${API_url}?search=${query}`)

        state.search.query = query;
        state.search.results = data.data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url, 
            }
        })

        // reset page to 1
        state.search.currentPage = 1
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
        ing.quantity = ing.quantity * newServings / state.recipe.servings
     })

    state.recipe.servings = newServings
}

export const addBookmark = function(recipe) {
    // Add bookmark
    state.bookmarks.push(recipe)

    // Mark current recipe as bookmark
    if (recipe.id === state.recipe.id) state.recipe.bookmark = true
}