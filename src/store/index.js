import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { bitcoinReducer } from './reducers/bitcoinReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  bitcoinModule: bitcoinReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))