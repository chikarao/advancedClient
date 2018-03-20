import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  // reduxthunk allow return of function and edirect access to dispatch method
//dispatch accepts action and forwards to all reducers;
// main pipeline of redux; dispatch can wait for async
  // now can place lots of logic
  return function (dispatch) {
    // redux thunk let's us call dispatch method; returns action
    // submit email/password to the server
    // same as { email: email, password: password}
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        console.log('we are in .then');
        // request is good
        // Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // save JWT token
        localStorage.setItem('token', response.data.token);
        //redirect to the route '/feature'
        browserHistory.push('/feature');
      })
        .catch(() => {
          // if request is bad
          // show error to user
          console.log('we are in .catch');
          dispatch(authError('Bad login info...'));
        });
  };
}

export function signupUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/feature');
    }).catch(error => {
      // console.log('error.response:', error.response.data.error);
      dispatch(authError(error.response.data.error));
    });
    // .catch(response => dispatch(console.log(response.data)));
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  //flip authenticated to false
  // delete token from local storage
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
      type: FETCH_MESSAGE,
      payload: response.data.message
    });
  });
};
}
