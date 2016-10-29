import {combineReducers} from 'redux';

import form from './form';
import login from './login';

const app = combineReducers({
  form,
  login
});

export default app;
