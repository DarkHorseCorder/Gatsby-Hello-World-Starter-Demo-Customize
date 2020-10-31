import { all, put, call, takeLatest } from 'redux-saga/effects';

// Action Types
import { 
  GET_PRICING_REQUEST, GET_PROMO_REQUEST
} from "../actions";

// Action Creators
import { 
  getPricingSuccess,getPromoSuccess
} from "../actions";

// API Calls
import { 
  api_getPricing, api_getPromo
} from '../api';

/* 
 * Get internet pricing
 */
function *getPricing(action) {
  try {
    const shop = document.getElementById('shop');
    const shop_component = document.getElementById('shop_component');
    shop.classList.remove("hidden");
    shop_component.classList.add("hidden");

    const response = yield call(api_getPricing, action.address);
    yield put(getPricingSuccess(response.data));
  } catch (error) {
    console.log('Error loading pricing data:', error.message);
    //yield put({ type: GET_PRICING_FAILURE, payload: error });
  }
}

function *listenForPricingRequest() {
  yield takeLatest(GET_PRICING_REQUEST, getPricing)
}

/* 
 * Get promo details
 */
function *getPromo(action) {
  try {
    const response = yield call(api_getPromo, action.code);
    yield put(getPromoSuccess(response.data));
  } catch (error) {
    console.log('Error loading promo data:', error.message);
    //yield put({ type: GET_PROMO_FAILURE, payload: error });
  }
}

function *listenForPromoRequest() {
  yield takeLatest(GET_PROMO_REQUEST, getPromo)
}


/* 
 * Assemble the rootSaga for export
 */
export default function *rootSaga() {
  yield all([
    listenForPricingRequest(),
    listenForPromoRequest()
  ])
}
