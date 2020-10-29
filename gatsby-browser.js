
exports.onRouteUpdate = props => {
  const { location } = props
  let clsName = "";
  
  switch (location.pathname) {
    case "/account":
      clsName = "account-login font-open-sans"
      break;
    case "/":
      clsName = "font-open-sans"
      break;
    default:
      clsName = "bg-white font-open-sans"
      break;
  }

  window.addEventListener('load', () => {
    document.body.className = clsName; //document.body.className.replace(/\bno-js\b/, '');
  });

}