const firebase = window.firebase;
export default firebase;

export const config = Object.freeze({
  apiKey: 'AIzaSyB_NVhYdoJVw1xAhQvX7opeXo6OIgKJNQs',
  authDomain: 'sparkplug-cf508.firebaseapp.com',
  databaseURL: 'https://sparkplug-cf508.firebaseio.com',
  storageBucket: 'sparkplug-cf508.appspot.com',
  messagingSenderId: '880163842790'
});

export let user;

export function toggleLogin() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    Materialze.toast(`Unfortunately, iOS sucks. It is therefore very unlikely
    that the login will actually work. If it does work on your device, it is
    considered a bug, so please report it.`);
  }

  if (!firebase.auth().currentUser) {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: 'pixelclubs.org'
    });
    firebase.auth().signInWithRedirect(provider);
  } else {
    firebase.auth().signOut();
  }
}

const accountBtn = document.querySelector('#account');
let initing = true;

firebase.initializeApp(config);

accountBtn.addEventListener('click', toggleLogin);

firebase.auth().getRedirectResult().then(() => {
  accountBtn.classList.remove('hidden');
}).catch(err => {
  window.dispatchEvent(new CustomEvent('log-in-failed', {
    detail: {
      message: err.message,
      err
    }
  }));
});

firebase.auth().onAuthStateChanged(user_ => {
  user = user_;

  if (user) {
    if (!user.email.endsWith('@pixelclubs.org')) {
      user = null;
      firebase.auth().signOut();
      accountBtn.textContent = 'Sign in';
      window.dispatchEvent(new CustomEvent('log-in-failed', {
        detail: {
          message: 'Please sign in with a pixelclubs.org account'
        }
      }));
    } else {
      accountBtn.textContent = 'Sign out';
      window.dispatchEvent(new CustomEvent('logged-in'));
    }
  } else if (!initing) {
    accountBtn.textContent = 'Sign in';
    window.dispatchEvent(new CustomEvent('logged-out'));
  }

  initing = false;
});
