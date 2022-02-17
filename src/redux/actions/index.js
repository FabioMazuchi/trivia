export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_TOKEN = 'GET_TOKEN';
export const REQUEST_PERGUNTAS = 'REQUEST_PERGUNTAS';
export const GET_PERGUNTAS = 'GET_PERGUNTAS';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const GET_EMAIL_NOME = 'GET_EMAIL_NOME';

export function requestPerguntas() {
  return { type: REQUEST_PERGUNTAS };
}

export function getPerguntas(json) {
  return { type: GET_PERGUNTAS, payload: json };
}

export function getEmailNome(state) {
  return { type: GET_EMAIL_NOME, payload: state };
}

export function requestToken() {
  return { type: REQUEST_TOKEN };
}

function getToken(json) {
  return { type: GET_TOKEN, payload: json };
}

const NUMBER = 3;

export function fetchToken() {
  return async (dispatch) => {
    dispatch(requestToken());
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const json = await response.json();
    dispatch(getToken(json));
  };
}

export function fetchPerguntas(token) {
  return async (dispatch) => {
    dispatch(requestPerguntas());
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await response.json();
    if (json.response_code === NUMBER) {
      const response1 = await fetch('https://opentdb.com/api_token.php?command=request');
      const json1 = await response1.json();
      const res1 = await fetch(`https://opentdb.com/api.php?amount=5&token=${json1.token}`);
      const final = await res1.json();
      dispatch(getPerguntas(final));
    } else {
      dispatch(getPerguntas(json));
    }
  };
}
