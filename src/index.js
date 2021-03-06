import React from 'react';
import {renderToString} from 'react-dom/server';
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
  fontFamily: 'Lato, sans-serif',
  userAgent: 'all'
};

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

console.log(renderToString(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <App />
    </MuiThemeProvider>
  </Provider>
));
