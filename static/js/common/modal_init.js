let popupModal = document.getElementById('availability-check-modal');
let bodyBlackout = document.querySelector('.body-blackout');


function func_modal_init() {

  console.log("func_modal_init function passed");
  // If there is no address in localStorage activate the availability-check modal
  popupModal = document.getElementById('availability-check-modal');
  bodyBlackout = document.querySelector('.body-blackout');
  if (localStorage.getItem('service_address') == null || localStorage.getItem('service_address') === '') {
    popupModal.classList.add('is-visible')
    bodyBlackout.classList.add('is-blacked-out')

    bodyBlackout.addEventListener('click', () => {
      popupModal.classList.remove('is-visible')
      bodyBlackout.classList.remove('is-blacked-out')
    })
  }

  // Update page content
  let service_addr = localStorage.getItem('service_address');
  console.log("service_addr: ", service_addr);
  let ele_service_addr = document.getElementById("service-address")
  if (ele_service_addr) {
    console.log("writing content", service_addr, ele_service_addr);

    ele_service_addr.innerHTML = service_addr;
  }
}

if(window.addEventListener){
  window.addEventListener('load',func_modal_init,false);
}else{
  window.attachEvent('onload',func_modal_init);
}
