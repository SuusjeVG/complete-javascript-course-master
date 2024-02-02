'use strict';

const btn_modal = document.querySelectorAll('.show-modal');
const close_btn = document.querySelector('.close-modal');
const model_container = document.querySelector('.modal');
const gradiant = document.querySelector('.gradiant');

// make a function of duplicating code en reuse it
const open_model = function () {
  model_container.classList.remove('hidden');
  gradiant.classList.remove('hidden');
};
const close_model = function () {
  model_container.classList.add('hidden');
  gradiant.classList.add('hidden');
};

/**** 
don't use the () for the close_model function because then the function immediatly gets executed
and we only want to execute that function on the click event. 
*****/
// open the modal
for (let i = 0; i < btn_modal.length; i++) {
  btn_modal[i].addEventListener('click', open_model);
}
// close the modal
close_btn.addEventListener('click', close_model);
gradiant.addEventListener('click', close_model);

// Keyboard event
document.addEventListener('keyup', function (e) {
  // e is an object with keys in it. to target the right key console log it and get
  // the e.theKey.
  // console.log(e);

  if (e.key === 'Escape' && !model_container.classList.contains('hidden')) {
    close_model();
  }
});

// example object
// const object = {
//   leeftijd: 22,
//   naam: 'Susan',
//   huisier: 'yoko',
// };

// console.log(object.leeftijd);
