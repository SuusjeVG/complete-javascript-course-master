'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// old
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Important event deligation instead of attaching the same event handlers to multple elements (for performance)
document.querySelector('.nav__links').addEventListener('click', function(e) {
  // console.log(e.target);
  e.preventDefault()

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({ behavior: 'smooth'})
  }
})



///////////////////////////
// Smooth scrolling button
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', function(e) {
  // old way
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX, // so you always get the full size from the left (otherwise if you not starting from the top/left it will only scroll to what the remaining is between the viewport and the element)
  //   top: s1coords.top + window.scrollY, // so you always get the full size from the top
  //   behavior: 'smooth'
  // })

  // modern way
  section1.scrollIntoView({ behavior: 'smooth'})
})

////////////////////
// Tabbed component
const $buttonTabs = document.querySelectorAll('.operations__tab')
const $tabsContainer = document.querySelector('.operations__tab-container')
const $tabsContent = document.querySelectorAll('.operations__content')

$tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab')

  // if something else is clicked wich doesn't have the operations tab as clossest (guard clause)
  if (!clicked) return

  // remove active classes
  $buttonTabs.forEach(e => e.classList.remove('operations__tab--active'))
  $tabsContent.forEach(e => e.classList.remove('operations__content--active'))

  // Add active tab
  clicked.classList.add('operations__tab--active')

  // content find  by data attribute and add the active class
  const id = clicked.getAttribute('data-tab') // clicked.dataSet.tab also possible
  let selected = document.querySelector(`.operations__content--${id}`)
  selected.classList.add('operations__content--active')
})

// Menu fade
const $navLinksContainer = document.querySelector('.nav__links')
const $navLinks = document.querySelectorAll('.nav__item')

$navLinksContainer.addEventListener('mouseover', function (e) {
  const hovered = e.target.closest('.nav__item');

  if (!hovered) return
  // console.log(hovered);
  // $navLinks.forEach(e => e === hovered ? hovered.style.opacity = '1' : e.style.opacity = '0.5')
  $navLinks.forEach(e => {
    if (e !== hovered) e.style.opacity = '0.5';
  });
})

$navLinksContainer.addEventListener('mouseout', function (e) {
  $navLinks.forEach(e => e.style.opacity = '1')
})

/////////////////////////
// sitkcy nav
// Bad for performance because it's running all the time when you scroll.
// s1coords.top possible
// const s1coords = section1.getBoundingClientRect();
// // headerCoords.bottom is possible
// const $header = document.querySelector('.header')
// const headerCoords = $header.getBoundingClientRect()
// const $nav = document.querySelector('.nav')

// // don't put the coords variable in the scroll event because then the value will always change when you scroll. Because it will check from the top of the viewport and when you scroll it will get more or less.
// window.addEventListener('scroll', () => {

//   if (window.scrollY > headerCoords.bottom) {
//     $nav.classList.add('sticky') 
//   } else {
//     $nav.classList.remove('sticky') 
//   }
//   console.log(window.scrollY);
// })

const $header = document.querySelector('.header')
const $nav = document.querySelector('.nav')
const navCoords = $nav.getBoundingClientRect()

// With intersection API
const obsOptions = {
  root: null, // whole viewport
  threshold: 0,
  rootMargin: -navCoords.height + 'px'// activate 90px before the threshold
}

// observer parameter is only if you want to stop observing. in this case we will not
const observerHeader = new IntersectionObserver((entries) => {
  const [entry] = entries

  if (!entry.isIntersecting) $nav.classList.add('sticky')  
  else $nav.classList.remove('sticky') 

}, obsOptions)

// observe the element
observerHeader.observe($header)

////////////////////////////
// load sections on scroll
const allSections = document.querySelectorAll('section')
const obsOptions2 = {
  root: null, // whole viewport
  threshold: 0.1,
}

const sectionObserver = new IntersectionObserver((entries, observer) => {
  // because this observer is used for multple sections it has an array with more elements then 1 so use the foreach loop instead of destructering because of bugg
  entries.forEach( (section) => {
    // also possible
    // if(!entry.isIntersecting) return

    if (section.isIntersecting) {
      section.target.classList.remove('section--hidden')

      // if class is added to target stop observering that target 
      observer.unobserve(section.target)
    }
  })
}, obsOptions2)

allSections.forEach((section) => {
  section.classList.add('section--hidden')
  sectionObserver.observe(section)
})

//////////////////////
// lazy loading
const lazyImages = document.querySelectorAll('img[data-src]')

const obsOptions3 = {
  root: null,
  threshold: 0,
  rootMargin: '200px'
}

const imageObserver = new IntersectionObserver((entries, observer) => { 
  // console.log(entries);
  entries.forEach(entry => {
    if (!entry.isIntersecting) return

    entry.target.src = entry.target.dataset.src

    // remove blur after image is loaded otherwist you get a blurred image.
    entry.target.addEventListener('load', function() {
      entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
  })
}, obsOptions3);

lazyImages.forEach(image => {
  imageObserver.observe(image)
})

/////////////////
// slider
const $slides = document.querySelectorAll('.slider .slide')

$slides.forEach((slide, i) => {
  slide.sty
  console.log(slide);
})
console.log($slides);

/************
 * Practices
*/
////////////////
// coockie
// const $header = document.querySelector('.header')
// const message = document.createElement('div')

// message.classList.add('cookie-message')
// message.innerHTML = `We use cookie for improvement analytics? <button class="btn btn--close-cookie"> Got it ! </button>`

// // prepend, append, before and after
// $header.after(message)
// document.querySelector('.btn--close-cookie').addEventListener('click', function (e) {
//   message.remove()
// })

// message.style.backgroundColor = '#37383d'
// // get the original css from style sheet (because you can't get it with just message.style.height. that only works for inline style.)
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px'

// custom properties in de root.
// document.documentElement.style.setProperty('--color-primary', 'orangered')

// normal attributes element. src/hrf/alt/ enz. for sources and links you get the absolute path. if you select with element.getAttribute('src') you will get the relative path.

// Data attributes
// if you want to select the data attributes like data-version-number="3". You need to do element.dataset.versionNumber.

//Class
// localStorage.classList.add()
// localStorage.classList.remove()
// localStorage.classList.togle()
// localStorage.classList.contains()


// Events (BUBBELING)
// const randomInt = (min, max) => {
//   const sum = Math.floor(Math.random() * (max - min + 1) + min)
//   return sum
// }

// // if you make it a string it wil be the same value everywhere you use it. With a function it will always be different.
// // const randomColor = `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
// })
// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
// })
// document.querySelector('nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
// })
