import FontFaceObserver from 'fontfaceobserver';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './App.js';

// import generate, {init as initGenerator} from './generator';
// import firebase, {toggleLogin, getUser, init as initFirebase} from './firebase';
// import upload from './uploader';
//
// export {logo, form, canvas, ctx} from './generator';
// export {generate, firebase, toggleLogin, upload};

// window.addEventListener('logged-in', () => {
//   console.log('logged-in');
//   Materialize.toast(`Logged in as ${getUser().displayName}`, 3000);
// });
//
// window.addEventListener('logged-out', () => {
//   console.log('logged-out');
//   Materialize.toast('Logged out', 3000);
// });
//
// window.addEventListener('log-in-failed', ({detail: {message, err}}) => {
//   Materialize.toast(`Login failed: ${message}`, 3000);
//   if (err) {
//     console.error(err);
//   }
// });
//
// window.addEventListener('upload-success', () => {
//   Materialize.toast('Upload succeeded', 3000);
// });
//
// window.addEventListener('upload-error', ({detail: {message, err}}) => {
//   const span = document.createElement('span');
//   span.innerText = `Upload failed: ${message}`;
//   Materialize.toast(span.innerHTML, 3000);
//   if (err) {
//     console.error(err);
//   }
// });

// initDatePicker();
// initGenerator();
// initFirebase();

injectTapEventPlugin();

const muiTheme = {
  fontFamily: 'Lato, sans-serif'
};

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
    <App />
  </MuiThemeProvider>,
  document.querySelector('.container')
);

new FontFaceObserver('Lato').load().catch(() => {}).then(() => {
  document.body.classList.add('fontsloaded');
});
