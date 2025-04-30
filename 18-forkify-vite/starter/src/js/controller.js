import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import searchView from './views/SearchView.js';
import resultView from './views/ResultView.js';
import paginationView from './views/PaginationView.js';
import bookmarkView from './views/BookmarkView.js';
import addRecipeView from './views/AddRecipeView.js';

import { MODAL_CLOSE_SEC } from './config.js';

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return 
    recipeView.renderSpinner()

    // 0) update result view to mark selected search result and bookmark
    resultView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    // 1) loading recipe
    await model.loadRecipe(id);

    // 2) rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    console.error(err, '❌❌' )
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

const controlAddBookmark = function() {
  // 1) Add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe) 
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe)

  // 2) Render bookmarks
  bookmarkView.render(model.state.bookmarks)
}

const controlBookmark = function() {
  // 1) Render bookmarks
  bookmarkView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe) {
  try {
    // Show loader spinner
    addRecipeView.renderSpinner()

    // 1) upload a new recipe
    await model.uploadRecipe(newRecipe)

    // 2) render recipe 
    recipeView.render(model.state.recipe)

    // 3) Render succes message
    addRecipeView.renderMessage();

    // 4) Render bookmark view
    bookmarkView.render(model.state.bookmarks)

    // 5) Change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    // 5) Close form window after certain time
    setTimeout(() => {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);

    console.log(model.state.recipe);

  } catch (err) {
    console.error('😱😱', err)
    addRecipeView.renderError(err.message)
  }
}

// controlAddRecipe()
const init = function() {
  bookmarkView.addHandlerRender(controlBookmark)
  recipeView.addHandlerRenderer(controlRecipes)
  recipeView.addHandlerServing(controlServings)
  recipeView.addHandlerBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResult)
  paginationView.addHandlerRenderer(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}

init()

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////