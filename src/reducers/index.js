import {combineReducers} from 'redux';

import form from './form';
import logIn from './log-in';
import snackbar from './snackbar';
import upload from './upload';

const app = combineReducers({
  form,
  logIn,
  snackbar,
  upload
});

export default app;
