//import { CountUp } from 'countup.js';
//import 'waypoints/lib/noframework.waypoints.min.js';
console.log("Up and running - INDEX, hombre...")
let tvOpenTriggers = document.querySelectorAll('.tv-open')
let phoneOpenTriggers = document.querySelectorAll('.phone-open')
let nextPageButtons = document.querySelectorAll(".next-page-btn")
let nextPageLinks = document.querySelectorAll(".next-page-link")

function funcHome() {

tvOpenTriggers = document.querySelectorAll('.tv-open')
phoneOpenTriggers = document.querySelectorAll('.phone-open')
nextPageButtons = document.querySelectorAll(".next-page-btn")
nextPageLinks = document.querySelectorAll(".next-page-link")

function scrollToTop(e) {
  // Chrome requires returnValue to be set.
  event.returnValue = '';
  // Reset page position
  window.scrollTo(0, 0);
  return null;
}

tvOpenTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    console.log(e.target.dataset.targetContent)
    window.location = "tv"
  })
})

phoneOpenTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    console.log(e.target.dataset.targetContent)
    window.location = "phone"
  })
})

function nextPage(target) {
  // location.href='internet'
  console.log(target)
}

nextPageLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    // Set next_page target in localStorage
    let next_page = e.target.dataset.nextPage;
    console.log("LinkBB")
    localStorage.setItem('next_page', next_page);
    // Check for customer address in localstorage 
    let service_addr = localStorage.getItem('service_address') || '';
    // Show address modal if address is missing, otherwise load 'next_page'
    // Clicking Check in modal will set window.location to 'next_page'
    const popupModal = document.getElementById('availability-check-modal');
    // const bodyBlackout = document.querySelector('.body-blackout');
    if (service_addr === '') {
      popupModal.classList.add('is-visible');
      bodyBlackout.classList.add('is-blacked-out');
    } else {
      // Jump to target
      //window.removeEventListener('beforeunload', scrollToTop);
      window.location = next_page;
    }
  });
});

nextPageButtons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    // Set next_page target in localStorage
    let next_page = e.target.dataset.nextPage;
    console.log("BB")
    localStorage.setItem('next_page', next_page);
    // Check for customer address in localstorage 
    let service_address = localStorage.getItem('service_address') || '';
    // Show address modal if address is missing, otherwise load 'next_page'
    // Clicking Check in modal will set window.location to 'next_page'
    const popupModal = document.getElementById('availability-check-modal');
    // const bodyBlackout = document.querySelector('.body-blackout');
    if (service_address === '') {
      popupModal.classList.add('is-visible');
      bodyBlackout.classList.add('is-blacked-out');
    } else {
      // Jump to target
      //window.removeEventListener('beforeunload', scrollToTop);
      window.location = next_page;
    }
  });
});
}


if(window.addEventListener){
  window.addEventListener('load',funcHome,false);
}else{
  window.attachEvent('onload',funcHome);
}