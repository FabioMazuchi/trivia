import player from './player';
import token from './token';

const { combineReducers } = require('redux');

const rootReducer = combineReducers({
  player,
  token,
});

export default rootReducer;
