import {
  CHANGE_FORM,
  SUBMIT
} from '../actionTypes';

export function changeForm(delta) {
  return {
    type: CHANGE_FORM,
    payload: delta
  };
}

export function submit() {
  return {
    type: SUBMIT
  };
}
