import WebFont from 'webfontloader';
import './datepicker.js';
import generate from './generator';
export * from './generator';
import firebase, {toggleLogin} from './firebase';

export {generate, firebase, toggleLogin};

WebFont.load({
  google: {
    families: ['Lato', 'Lato:bold']
  },
  active: () => {
    window.dispatchEvent(new Event('fontsloaded'));
  }
});

window.addEventListener('logged-in', () => {
  console.log('logged-in');
  Materialize.toast(`Logged in as ${firebase.auth().currentUser.displayName}`, 3000);
});

window.addEventListener('logged-out', () => {
  console.log('logged-out');
  Materialize.toast('Logged out successfully', 3000);
});

window.addEventListener('log-in-failed', e => {
  Materialize.toast(`Login failed: ${e.detail.message}`, 3000);
  if (e.detail.err) {
    console.error(e.detail.err);
  }
});
