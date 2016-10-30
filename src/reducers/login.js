import {handleActions} from 'redux-actions';
import {LOG_IN_START, LOG_IN_COMPLETE, LOG_OUT} from '../actions';

const initialState = {
  initing: true,
  loggingIn: false,
  user: null
};

export default handleActions({
  [LOG_IN_START]: (state, {meta}) => ({
    initing: !!meta.initial,
    loggingIn: true,
    user: null,
  }),
  [LOG_IN_COMPLETE]: (state, {payload, error}) => ({
    initing: false,
    loggingIn: false,
    user: !error && payload || null
  }),
  [LOG_OUT]: () => ({
    initing: false,
    loggingIn: false,
    user: null
  })
}, initialState);
