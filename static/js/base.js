
function getOrderID() {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

function updateCustomerTypeInNav(customer_type = 'RESIDENTIAL') {
  const business_link = document.getElementById('BusinessLink');
  const residential_link = document.getElementById('ResidentialLink');

  if (customer_type == 'RESIDENTIAL') {
    business_link.style.color = '#ffffff';
    residential_link.style.color = '#eb3f35';
  } else {
    business_link.style.color = '#eb3f35';
    residential_link.style.color = '#ffffff';
  }
}

function logKey(e) {
  var isEscape = false;
  if ("key" in e) {
    isEscape = (e.key === "Escape" || e.key === "Esc");
  } else {
    isEscape = (e.keyCode === 27);
  }
  const popupModal = document.getElementById("availability-check-modal")
  if (isEscape) {
    popupModal.classList.remove('is-visible')
    bodyBlackout.classList.remove('is-blacked-out')
  }
}

function resizeNav() {
  let media_query = window.matchMedia("(max-width: 640px)");
  if (!media_query.matches) {
    var Logo = document.getElementById("Logo");
    var Header = document.getElementById("Header");
    var NavLinks = document.getElementById("NavLinks");
    if (window.scrollY > 5 || document.documentElement.scrollTop > 5) {
      if (Logo.classList.contains('header-logo-large') && Header.classList.contains('header-large')) {
        Logo.classList.replace('header-logo-large', 'header-logo-small');
        Header.classList.replace('header-large', 'header-small');
        NavLinks.classList.replace('nav-links-large', 'nav-links-small');
      }
      if (Logo.classList.contains('header-logo-large') && Header.classList.contains('header-large-secondary')) {
        Logo.classList.replace('header-logo-large', 'header-logo-small');
        Header.classList.replace('header-large-secondary', 'header-small-secondary');
        NavLinks.classList.replace('nav-links-large', 'nav-links-small');
      }
    } else {
      if (Logo.classList.contains('header-logo-small') && Header.classList.contains('header-small')) {
        Logo.classList.replace('header-logo-small', 'header-logo-large');
        Header.classList.replace('header-small', 'header-large');
        NavLinks.classList.replace('nav-links-small', 'nav-links-large');
      }
      if (Logo.classList.contains('header-logo-small') && Header.classList.contains('header-small-secondary')) {
        Logo.classList.replace('header-logo-small', 'header-logo-large');
        Header.classList.replace('header-small-secondary', 'header-large-secondary');
        NavLinks.classList.replace('nav-links-small', 'nav-links-large');
      }
    }
  }
}

function base() {
  console.log("base passed!")
  const modalTriggers = document.querySelectorAll('.modal-popup-trigger');
  // const bodyBlackout = document.querySelector('.body-blackout');

  // Add Order_ID
  if (localStorage.getItem('order_id') == null)
    localStorage.setItem('order_id', getOrderID());

  (function () {
    window.updateServiceAddress = function () {
      console.log('Outside function window.test called from within the react component.');
      const popupModal = document.querySelector("[data-popup-modal='availability_check']")
      popupModal.classList.add('is-visible')
      bodyBlackout.classList.add('is-blacked-out')

      bodyBlackout.addEventListener('click', () => {
        popupModal.classList.remove('is-visible')
        bodyBlackout.classList.remove('is-blacked-out')
      })
      return false;
    };
  }());

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const { popupTrigger } = trigger.dataset
      const popupModal = document.querySelector(`[data-popup-modal="${popupTrigger}"]`)
      popupModal.classList.add('is-visible')
      bodyBlackout.classList.add('is-blacked-out')

      bodyBlackout.addEventListener('click', () => {
        popupModal.classList.remove('is-visible')
        bodyBlackout.classList.remove('is-blacked-out')
      })
    })
  })

  // Add listeners for "Check Address" clicks
  document.getElementById("SetServiceAddress").addEventListener("click", function (event) {
    const popupModal = document.querySelector("[data-popup-modal='availability_check']")
    // Catch the event when the service address is set
    let city = document.getElementById('city').value
    let province = document.getElementById('province').value
    let postal_code = document.getElementById('postal_code').value
    let service_address = document.getElementById('service_address_input').value
    let next_page = localStorage.getItem('next_page') || 'internt';
    if (service_address.length > 0) {
      localStorage.clear();
      localStorage.setItem('city', city);
      localStorage.setItem('province', province);
      localStorage.setItem('postal_code', postal_code);
      localStorage.setItem('service_address', service_address);
      window.location = '/internet';
    }
    // Set an expiry time of + 6 hrs and reset pricing string in localStorage to '', it will be 
    // retrieved in the Internet, TV or Phone component
    const now = new Date();
    const ttl = 6 * 3600 * 1000;
    localStorage.setItem('expiry', now.getTime() + ttl);
  });

  document.getElementById("AddressForm").addEventListener("submit", function (event) {
    event.preventDefault();
  }, true);

  document.getElementById("AddressForm").addEventListener("onsubmit", function (event) {
    event.preventDefault();
  }, true);

  const fields = [
    { element: "city", field: "City", mode: pca? pca.fieldMode.POPULATE : "" },
    { element: "province", field: "Province", mode: pca? pca.fieldMode.POPULATE : "" },
    { element: "postal_code", field: "PostalCode", mode: pca? pca.fieldMode.POPULATE : "" },
    { element: "service_address", field: "{Line1}{, {Line2}}, {City}, {Province}, {PostalCode}", mode: pca? pca.fieldMode.DEFAULT : "" },
  ];

  let options = {
    key: "WF19-AY25-TD96-YT85",
    bar: {
      showCountry: false,
      showLogo: false,
      visible: false
    }
  }

  let addressControl = pca? new pca.Address(fields, options) : null;

  /*
   * Start a New Order
   */

  let order_started = localStorage.getItem('order_started') || new Date().getTime();
  order_started = parseInt(order_started);
  localStorage.setItem('order_started', order_started);

  /*
   * If last order update is over 1 hr old, clear order, save address 
   * and begin anew
  */
  const now = new Date();
  //const ttl = 1000 * 60 * 60 // 1 hr
  const ttl = 1000 * 60 * 60 * 2; // 2 hrs
  
  let city = localStorage.getItem('city') || '';
  let province = localStorage.getItem('province') || '';
  let postal_code = localStorage.getItem('postal_code') || '';
  let service_address = localStorage.getItem('service_address') || '';

  if ((now.getTime() > order_started + ttl)) {
    localStorage.clear();
    localStorage.setItem('city', city);
    localStorage.setItem('province', province);
    localStorage.setItem('postal_code', postal_code);
    localStorage.setItem('service_address', service_address);
    localStorage.setItem('order_id', getOrderID())
  }

  // Check if customer_type has been set
  let customer_type = localStorage.getItem('customer_type') || '';
  // If customer_type == '', set to RESIDENTIAL
  if (customer_type == '') {
    customer_type = 'RESIDENTIAL'
    localStorage.setItem('customer_type', customer_type);
  }

  updateCustomerTypeInNav(customer_type);
  // Set event handlers to update local state if either Business or Residentail nav links are clicked
  document.getElementById('BusinessLink').addEventListener("click", function (event) {
    // If customer_type = RESIDENTIAL then set Business Nav Link active, clear localStorage, 
    // and reset window.location to 'index.html'
    if (localStorage.getItem('customer_type') === 'RESIDENTIAL') {
      updateCustomerTypeInNav(customer_type);
      let city = localStorage.getItem('city') || '';
      let province = localStorage.getItem('province') || '';
      let postal_code = localStorage.getItem('postal_code') || '';
      let service_address = localStorage.getItem('service_address') || '';
      localStorage.clear();
      localStorage.setItem('city', city);
      localStorage.setItem('province', province);
      localStorage.setItem('postal_code', postal_code);
      localStorage.setItem('service_address', service_address);
      localStorage.setItem('customer_type', 'BUSINESS');
      localStorage.setItem('order_id', getOrderID())
      window.location = 'index';
    }
  });

  document.getElementById('ResidentialLink').addEventListener("click", function (event) {
    // If customer_type = BUSINESS then set Business Nav Link active, clear localStorage, 
    // and reset window.location to 'index.html'
    if (localStorage.getItem('customer_type') === 'BUSINESS') {
      updateCustomerTypeInNav(customer_type);
      let city = localStorage.getItem('city') || '';
      let province = localStorage.getItem('province') || '';
      let postal_code = localStorage.getItem('postal_code') || '';
      let service_address = localStorage.getItem('service_address') || '';
      localStorage.clear();
      localStorage.setItem('city', city);
      localStorage.setItem('province', province);
      localStorage.setItem('postal_code', postal_code);
      localStorage.setItem('service_address', service_address);
      localStorage.setItem('customer_type', 'RESIDENTIAL');
      localStorage.setItem('order_id', getOrderID())
      window.location = 'index';
    }
  });

  window.addEventListener('scroll', function (e) {
    requestAnimationFrame(resizeNav);
  });

  document.getElementById("MobileMenuBtn").addEventListener("click", function (event) {
    // Detect all clicks on the mobile_menu
    console.log("Mobile Menu Button Click");
    //event.stopPropagation();
    const mobile_menu = document.getElementById('MobileMenu');
    mobile_menu.classList.toggle("hidden");
  });

  // Allow keyboard ESC to close modal
  document.addEventListener('keydown', logKey);
}

if(window.addEventListener){
    window.addEventListener('load',base,false);
}else{
    window.attachEvent('onload',base);
}