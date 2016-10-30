import {handleActions} from 'redux-actions';
import {CHANGE_FORM} from '../actions';
import formatDate from '../format-date';

const date = new Date();
const initialState = {
  name: 'Web Workshop 1',
  date,
  formattedDate: formatDate(date),
  headingColor: '#ffffff',
  backgroundColor: '#433a3a',
  stop1: '#ff0084',
  stop2: '#fad38d'
};

export default handleActions({
  [CHANGE_FORM]: (state, {payload}) => {
    if (payload.date) {
      payload = {
        ...payload,
        formattedDate: formatDate(payload.date)
      };
    }

    return {
      ...state,
      ...payload
    };
  }
}, initialState);
