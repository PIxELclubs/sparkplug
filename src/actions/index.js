import * as form from './form.js';
import * as logIn from './log-in.js';
import * as snackbar from './snackbar.js';
import * as upload from './upload.js';

// has to use module.exports to work around bug in Babel
module.exports = {
  ...form,
  ...logIn,
  ...snackbar,
  ...upload
};
