import {combineReducers} from 'redux';

import form from './form';
import login from './login';
import snackbar from './snackbar';

const app = combineReducers({
  form,
  login,
  snackbar
});

export default app;
