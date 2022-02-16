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

const NUMBER = 3;

// export function fetchToken() {
//   return (dispatch) => {
//     dispatch(requestToken());
//     return fetch('https://opentdb.com/api_token.php?command=request')
//       .then((response) => response.json())
//       .then((json) => {
//         if (json.response_code === NUMBER) {
//           fetch('https://opentdb.com/api_token.php?command=request')
//           .then((response) => response.json())
//           .dispatch(getToken(json)
//         }
//         dispatch(getToken(json))}
//       )
//       .catch(() => dispatch(failedRequest()));
//   };
// }

export function fetchToken() {
  return async (dispatch) => {
    dispatch(requestToken());
    let response = await fetch('https://opentdb.com/api_token.php?command=request');
    let res = await response.json();
    console.log(res.response_code);
    if (res.response_code === NUMBER) {
      response = await fetch('https://opentdb.com/api_token.php?command=request');
      res = await response.json();
      dispatch(getToken(res));
    } else {
      dispatch(getToken(res));
    }
  };
}

export function fetchPerguntas(token) {
  return (dispatch) => {
    dispatch(requestPerguntas());
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((json) => dispatch(getPerguntas(json)))
      .catch(() => dispatch(failedRequest()));
  };
}
