import createActions from 'redux-actions/lib/createActions';
import {upload, FILES} from './upload';

export const CHANGE_FORM = 'CHANGE_FORM';
export const SUBMIT = 'SUBMIT';

export const {
  changeForm
} = createActions({},
  CHANGE_FORM
);

export function submit({
  emailBannerPromise
}) {
  return (dispatch, getState) => {
    return Promise.all([emailBannerPromise]).then(([emailBanner]) => {
      return dispatch(upload(getState().form, {
        [FILES.EMAIL_BANNER]: emailBanner
      }));
    });
  }
}
