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

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case CHANGE_FORM:
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

    default:
      return state;
  }
};
