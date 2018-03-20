import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth';
//RequireAuth from HOC LESSON
// RequireAuth only changes in require_auth and this file; just wrap feature
import { AUTH_USER } from './actions/types';
//
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

// if we have token, consider the user to be signed in
if (token) {
  // we need to update application state
  // dispatch is s method of store!!!
  store.dispatch({ type: AUTH_USER });
}

// <Provider store={createStoreWithMiddleware(reducers)}>
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
