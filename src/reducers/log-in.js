import handleActions from 'redux-actions/lib/handleActions';
import {LOG_IN_START, LOG_IN_COMPLETE, ADD_TOKENS, LOG_OUT} from '../actions';

const initialState = {
  initing: true,
  loggingIn: false,
  user: null,
  tokens: null
};

export default handleActions({
  [LOG_IN_START]: (state, {meta}) => ({
    initing: !!meta.initial,
    loggingIn: true,
    user: null,
    tokens: null
  }),
  [LOG_IN_COMPLETE]: (state, {payload, error}) => ({
    initing: false,
    loggingIn: false,
    user: !error && payload || null,
    tokens: null
  }),
  [ADD_TOKENS]: {
    next: (state, {payload}) => ({
      ...state,
      tokens: payload
    })
  },
  [LOG_OUT]: () => ({
    initing: false,
    loggingIn: false,
    user: null,
    tokens: null
  })
}, initialState);
