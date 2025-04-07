import * as model from './model.js';
import recipeView from './views/recipeView.js';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return 

    recipeView.renderSpinner()

    // 1) loading recipe
    await model.loadRecipe(id);

    // 2) rendering recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    console.error(err.message, '❌❌' )
  }

};

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));

// const showRecipe = async function() {
//   try {
//     const id = window.location.hash.slice(1);

//     if (!id) return

//     // 1) loading recipe
//     renderSpinner(recipeContainer)
//     const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
//     const data = await res.json()

//     // 2) custom error
//     if (!res.ok) throw new Error(`${data.message}. Status: ${res.status}`)
    
//     // 3) format data
//     let {recipe} = data.data;

//     recipe = {
//       id: recipe.id,
//       title: recipe.title,
//       publisher: recipe.publisher,
//       source: recipe.source_url,
//       image: recipe.image_url, 
//       cookingTime: recipe.cooking_time,
//       servings: recipe.servings,
//       ingredients: recipe.ingredients,
//     }

//     // 4) rendering recipe
//     let html = `
//       <figure class="recipe__fig">
//         <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
//         <h1 class="recipe__title">
//           <span>${recipe.title}</span>
//         </h1>
//       </figure>

//       <div class="recipe__details">
//         <div class="recipe__info">
//           <svg class="recipe__info-icon">
//             <use href="${icons}#icon-clock"></use>
//           </svg>
//           <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime} </span>
//           <span class="recipe__info-text">minutes</span>
//         </div>
//         <div class="recipe__info">
//           <svg class="recipe__info-icon">
//             <use href="${icons}#icon-users"></use>
//           </svg>
//           <span class="recipe__info-data recipe__info-data--people">${recipe.servings} </span>
//           <span class="recipe__info-text">servings</span>

//           <div class="recipe__info-buttons">
//             <button class="btn--tiny btn--increase-servings">
//               <svg>
//                 <use href="${icons}#icon-minus-circle"></use>
//               </svg>
//             </button>
//             <button class="btn--tiny btn--increase-servings">
//               <svg>
//                 <use href="${icons}#icon-plus-circle"></use>
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div class="recipe__user-generated">
//           <svg>
//             <use href="${icons}#icon-user"></use>
//           </svg>
//         </div>
//         <button class="btn--round">
//           <svg class="">
//             <use href="${icons}#icon-bookmark-fill"></use>
//           </svg>
//         </button>
//       </div>

//       <div class="recipe__ingredients">
//         <h2 class="heading--2">Recipe ingredients</h2>
//         <ul class="recipe__ingredient-list">
//             ${recipe.ingredients.map(ing => {
//               return `
//                 <li class="recipe__ingredient">
//                   <svg class="recipe__icon">
//                     <use href="${icons}#icon-check"></use>
//                   </svg>
//                   <div class="recipe__quantity">${ing.quantity}</div>
//                   <div class="recipe__description">
//                     <span class="recipe__unit">${ing.unit}</span>
//                     ${ing.description}
//                   </div>
//                 </li>
//               `
//             }).join('')}
//         </ul>
//       </div>

//       <div class="recipe__directions">
//         <h2 class="heading--2">How to cook it</h2>
//         <p class="recipe__directions-text">
//           This recipe was carefully designed and tested by
//           <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
//           directions at their website.
//         </p>
//         <a
//           class="btn--small recipe__btn"
//           href="${recipe.source}"
//           target="_blank"
//         >
//           <span>Directions</span>
//           <svg class="search__icon">
//             <use href="${icons}#icon-arrow-right"></use>
//           </svg>
//         </a>
//       </div>
//     `

//     recipeContainer.innerHTML = ''
//     recipeContainer.insertAdjacentHTML('afterbegin', html)

//   } catch (err) {
//     console.error(err.message, '❌❌' )
//   }

// };

// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
// window.addEventListener('hashchange', showRecipe)
// window.addEventListener('load', showRecipe)