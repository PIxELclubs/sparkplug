import {createActions} from 'redux-actions';

export const CHANGE_FORM = 'CHANGE_FORM';
export const SUBMIT = 'SUBMIT';

export const {
  changeForm,
  submit
} = createActions({},
  CHANGE_FORM,
  SUBMIT
);
