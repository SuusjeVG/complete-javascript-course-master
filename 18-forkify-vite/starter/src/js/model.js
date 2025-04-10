import { API_url } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        result: []
    }
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
        state.search.result = data.data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url, 
            }
        })

        // console.log(state.search.result);
    } catch (err) {
        console.error(err.message, '❌❌' )
        throw err;
    }
}