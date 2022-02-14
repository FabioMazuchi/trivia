import player from './player';
import token from './token';

const { combinereducers } = require('redux');

const rootReducer = combinereducers({
  player,
  token,
});

export default rootReducer;
