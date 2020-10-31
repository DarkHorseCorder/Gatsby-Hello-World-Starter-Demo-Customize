export const GET_PRICING_REQUEST = 'GET_PRICING_REQUEST';
export const GET_PRICING_SUCCESS = 'GET_PRICING_SUCCESS';
export const GET_PROMO_REQUEST = 'GET_PROMO_REQUEST';
export const GET_PROMO_SUCCESS = 'GET_PROMO_SUCCESS';

export function getPricing(address) {
  return { 
    type: GET_PRICING_REQUEST,
    address: address,
  };
}

export function getPricingSuccess(payload) {
  return {
    type: GET_PRICING_SUCCESS,
    payload: payload
  };
}

export function getPromo(code) {
  return { 
    type: GET_PROMO_REQUEST,
    code: code,
  };
}

export function getPromoSuccess(payload) {
  return {
    type: GET_PROMO_SUCCESS,
    payload: payload
  };
}
