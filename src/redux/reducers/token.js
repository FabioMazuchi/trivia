import { REQUEST_TOKEN, GET_TOKEN, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return { ...state };
  case GET_TOKEN:
    return action.payload.token;
  case FAILED_REQUEST:
    return { ...state, token: action.payload };
  default:
    return state;
  }
};

export default token;
