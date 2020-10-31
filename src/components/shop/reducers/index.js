import {
  GET_PRICING_SUCCESS, GET_PROMO_SUCCESS
} from '../actions';


const initialState = {
  packages: [],
  specials: [],
  promo: {}
};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_PRICING_SUCCESS:

      const shop = document.getElementById('shop');
      const shop_component = document.getElementById('shop_component');
      shop.classList.add("hidden");
      shop_component.classList.remove("hidden");

      return { ...state,
        packages: action.payload
      }
    case GET_PROMO_SUCCESS:
      return { ...state,
        promo: action.payload
      }

    default:
      return state;
  }
}