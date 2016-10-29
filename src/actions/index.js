export const CHANGE_FORM = Symbol('CHANGE_FORM');
export const SUBMIT = Symbol('SUBMIT');
export const LOG_IN = Symbol('LOG_IN');
export const LOG_OUT = Symbol('LOG_OUT');

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
