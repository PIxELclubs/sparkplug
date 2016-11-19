import FontFaceObserver from 'fontfaceobserver';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {initializeLogIn} from './actions';
import rootReducer from './reducers';
import App from './components/App';

injectTapEventPlugin();

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)));

store.dispatch(initializeLogIn());

const muiTheme = {
  fontFamily: 'Lato, sans-serif'
};

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('.container')
);

new FontFaceObserver('Lato').load().catch(() => {}).then(() => {
  document.body.classList.add('fontsloaded');
});
