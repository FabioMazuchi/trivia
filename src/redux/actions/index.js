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

function failedRequest() {
  return { type: FAILED_REQUEST };
}

export function fetchToken() {
  return (dispatch) => {
    dispatch(requestToken());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((json) => dispatch(getToken(json)))
      .catch(() => dispatch(failedRequest()));
  };
}

const fetchPerguntas = () => async (dispatch) => {
  const tokenStorage = localStorage.getItem('token') || '{}';
  const token = JSON.parse(tokenStorage);
  const ERRO_NUMBER = 3;
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  if (response.response_code === ERRO_NUMBER) return dispatch(failedRequest())
  const responseFinal = await response.json();
  dispatch(getPerguntas(responseFinal));
}

export default fetchPerguntas;