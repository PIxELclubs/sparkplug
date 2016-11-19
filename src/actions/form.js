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
  return async (dispatch, getState) => {
    const [emailBanner] = await Promise.all([emailBannerPromise]);
    
    await dispatch(upload(getState().form, {
      [FILES.EMAIL_BANNER]: emailBanner
    }));
  }
}
