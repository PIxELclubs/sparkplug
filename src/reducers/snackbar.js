import handleActions from 'redux-actions/lib/handleActions';
import {LOG_IN_COMPLETE, LOG_OUT, RESET_SNACKBAR, UPLOAD_COMPLETE} from '../actions';

const whitelist = [
  LOG_IN_COMPLETE,
  UPLOAD_COMPLETE
];

const initialState = {
  open: false,
  message: ''
};

const specifics = handleActions({
  [RESET_SNACKBAR]: () => initialState,

  [LOG_IN_COMPLETE]: {
    next(state, {payload}) {
      if (payload) {
        return {
          open: true,
          message: `Signed in as ${payload.displayName}`
        };
      }

      return state;
    }
  },
  [LOG_OUT]: () => ({
    open: true,
    message: 'You have signed out'
  }),

  [UPLOAD_COMPLETE]: {
    next(state, {payload}) {
      return {
        open: true,
        message: 'Upload succeeded'
      };
    }
  }
}, initialState);

export default (state, action) => {
  const {type, payload, error} = action;
  if (error && whitelist.includes(type)) {
    return {
      open: true,
      message: payload.message || payload
    };
  }

  return specifics(state, action);
}
