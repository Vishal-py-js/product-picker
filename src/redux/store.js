import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk' 
import { addProductsReducer, productsReducer } from './products/reducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const enhancer = composeEnhancers(applyMiddleware(
    thunk 
  ));

const rootReducer = combineReducers({ 
    products: productsReducer,
    addedProducts: addProductsReducer,
});


const store = createStore(
    rootReducer, 
    {},
    enhancer
);
  
export default store;