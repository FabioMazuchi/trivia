import player from './player';
import token from './token';
import perguntas from './perguntas';

const { combineReducers } = require('redux');

const rootReducer = combineReducers({
  player,
  token,
  perguntas,
});

export default rootReducer;
