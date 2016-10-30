import FontFaceObserver from 'fontfaceobserver';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {initializeLogIn} from './actions';
import rootReducer from './reducers';
import App from './components/App';

injectTapEventPlugin();

const muiTheme = {
  fontFamily: 'Lato, sans-serif'
};

const loggerMiddleware = createLogger();
const composeDevTools =
  process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)));

store.dispatch(initializeLogIn());

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
