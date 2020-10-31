import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas'
import Shop from './containers';

const sagaMiddleware = createSagaMiddleware();    
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

export default function ShopComponent({lang}) {
  return <Provider store={store}>
          <Shop lang = {lang}/>
        </Provider>
}