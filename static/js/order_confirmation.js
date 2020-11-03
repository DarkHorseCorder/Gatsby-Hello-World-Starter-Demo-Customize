function func_order_confirmation() {
  let ele_order_reference = document.getElementById("order_reference");

  if (ele_order_reference) {
    ele_order_reference.innerHTML = localStorage.getItem("order_id")
  } 
}

if(window.addEventListener){
  window.addEventListener('load',func_order_confirmation,false);
}else{
  window.attachEvent('onload',func_order_confirmation);
}