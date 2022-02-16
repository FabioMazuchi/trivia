import { REQUEST_PERGUNTAS, GET_PERGUNTAS, FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  response: {},
};

const perguntas = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_PERGUNTAS:
    return { ...state };
  case GET_PERGUNTAS:
    // console.log(action);
    return { ...state, response: action.payload };
  case FAILED_REQUEST:
    return { ...state, response: action.payload };
  default:
    return state;
  }
};

export default perguntas;
