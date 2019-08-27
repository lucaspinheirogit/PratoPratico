import { createStore, combineReducers, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';

import UsuarioReducer from './redux/reducers/UsuarioReducer';
import PratoReducer from './redux/reducers/PratoReducer';

const store = createStore(
  combineReducers({ UsuarioReducer, PratoReducer }),
  applyMiddleware(thunk)
);

export default store;
