import createActions from 'redux-actions/lib/createActions';
import isBrowser from 'is-in-browser';

export const LOG_IN_START = 'LOG_IN_START';
export const LOG_IN_COMPLETE = 'LOG_IN_COMPLETE';
export const ADD_TOKENS = 'ADD_TOKENS';
export const LOG_OUT = 'LOG_OUT';

const firebase = isBrowser && window.firebase;

const config = Object.freeze({
  apiKey: 'AIzaSyB_NVhYdoJVw1xAhQvX7opeXo6OIgKJNQs',
  authDomain: 'sparkplug-cf508.firebaseapp.com',
  databaseURL: 'https://sparkplug-cf508.firebaseio.com',
  storageBucket: 'sparkplug-cf508.appspot.com',
  messagingSenderId: '880163842790'
});

export const {
  logInStart,
  logInComplete,
  addTokens
} = createActions(
  {
    [LOG_IN_START]: [
      () => {},
      (initial = false) => ({initial})
    ]
  },
  LOG_IN_COMPLETE,
  ADD_TOKENS
);

export function logIn() {
  return (dispatch, getState) => {
    dispatch(logInStart());

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: 'pixelclubs.org'
    });
    firebase.auth().signInWithRedirect(provider);
  };
}

export function logOut() {
  firebase.auth().signOut();
  return {
    type: LOG_OUT
  };
}

export function toggleLogIn() {
  return (dispatch, getState) => (
    dispatch((getState().logIn.user ? logOut : logIn)())
  );
}

export function initializeLogIn() {
  return async (dispatch, getState) => {
    dispatch(logInStart(true));

    firebase.initializeApp(config);

    try {
      const {user} = await firebase.auth().getRedirectResult();
      
      // If user is now logged in, the action will be dispatched
      // by the onAuthStateChanged listener below.
      if (!user) {
        dispatch(logInComplete(null));
      }
    } catch (err) {
      dispatch(logInComplete(err));
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user && !user.email.endsWith('@pixelclubs.org')) {
        firebase.auth().signOut();
        dispatch(logInComplete(new Error('Please sign in with a pixelclubs.org account')));
      } else if (user) {
        dispatch(logInComplete(user));
      }

      // `user` can be null in two situations:
      // - Logging out (handled by logOut())
      // - Initialization (handled by getRedirectResult() handler)
    });
  }
}

export function getTokens() {
  return dispatch => {
    return firebase.database().ref('/tokens').once('value')
      .then(r => r.val())
      .then(tokens => dispatch(addTokens(tokens)));
  }
}
