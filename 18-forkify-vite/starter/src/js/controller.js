import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import searchView from './views/SearchView.js';
import resultView from './views/ResultView.js';
import paginationView from './views/PaginationView.js';

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return 
    recipeView.renderSpinner()

    // 0) update result view to mark selected search result
    resultView.update(model.getSearchResultsPage())

    // 1) loading recipe
    await model.loadRecipe(id);

    // 2) rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    console.error(err.message, '❌❌' )
    recipeView.renderError()
  }
};

const controlSearchResult = async function() {
  try{
    resultView.renderSpinner()

    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return

    // 2) load search results
    await model.loadSearchResults(query)

    // 3) render search results + pagination
    resultView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);

  } catch(err) {
    console.error(err.message, '❌❌' )
    resultView.renderError()
  }
}

const controlPagination = function(goToPage) {
    // 1) render search NEW results + pagination
    resultView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  //update recipe servings (in state)
  model.updateServings(newServings)
  // update the view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe)
}

const init = function() {
  recipeView.addHandlerRenderer(controlRecipes)
  recipeView.addHandlerServing(controlServings)
  searchView.addHandlerSearch(controlSearchResult)
  paginationView.addHandlerRenderer(controlPagination)
}

init()

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////