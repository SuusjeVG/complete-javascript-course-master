const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

console.log('test');
// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function() {
  try {
    const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886')

    if (!res.ok) throw new Error('Failed to fetch ❌❌')
    const data = await res.json()
  
    console.log(data);
  } catch (err) {
    console.log(err);
    console.error(err.message)
  }

}
showRecipe()