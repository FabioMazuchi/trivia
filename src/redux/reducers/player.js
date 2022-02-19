import { GET_EMAIL_NOME, UPDATE_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_EMAIL_NOME:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case UPDATE_POINTS:
    return {
      ...state,
      score: action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
