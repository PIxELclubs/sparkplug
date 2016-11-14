import createActions from 'redux-actions/lib/createActions';
import u from 'immutability-helper';
import githubUpload from '../github-upload';
import {getTokens} from './log-in';

export const UPLOAD_START = 'UPLOAD_START';
export const TASK_GROUP_START = 'TASK_GROUP_START';
export const TASK_START = 'TASK_START';
export const TASK_COMPLETE = 'TASK_COMPLETE';
export const TASK_GROUP_COMPLETE = 'TASK_GROUP_COMPLETE';
export const UPLOAD_COMPLETE = 'UPLOAD_COMPLETE';

export const RESET_UPLOAD_PROGRESS = 'RESET_UPLOAD_PROGRESS';

export const TASKS = {
  TOKENS: 'tokens',
  PREPARE: 'prepare',
  UPLOAD: 'upload'
};

export const FILES = {
  EMAIL_BANNER: 'emailBanner'
};

const taskGroupAction = [
  (task, payload) => payload,
  (task) => ({task})
];
const taskAction = [
  (task, file, payload) => payload,
  (task, file) => ({task, file})
];

export const {
  uploadStart,
  taskGroupStart,
  taskStart,
  taskComplete,
  taskGroupComplete,
  uploadComplete,
  resetUploadProgress
} = createActions(
  {
    [TASK_GROUP_START]: taskGroupAction,
    [TASK_START]: taskAction,
    [TASK_COMPLETE]: taskAction,
    [TASK_GROUP_COMPLETE]: taskGroupAction
  },
  UPLOAD_START,
  UPLOAD_COMPLETE,
  RESET_UPLOAD_PROGRESS
);

export function upload(form, canvases) {
  return dispatch => {
    dispatch(uploadStart());

    return dispatch(getTokensTask()).then(() =>
      dispatch(prepareFiles(canvases))
    ).then(({payload: blobs}) =>
      dispatch(uploadFiles(form, blobs))
    ).then(() =>
      dispatch(uploadComplete())
    ).catch(err => {
      dispatch(uploadComplete(err));
      return Promise.reject(err);
    })
  }
}

export function getTokensTask() {
  return dispatch => {
    dispatch(taskGroupStart(TASKS.TOKENS));
    dispatch(taskStart(TASKS.TOKENS));
    return dispatch(getTokens()).then(
      action => {
        dispatch(taskComplete(TASKS.TOKENS));
        dispatch(taskGroupComplete(TASKS.TOKENS));
      }, err => {
        dispatch(taskComplete(TASKS.TOKENS, null, err));
        dispatch(taskGroupComplete(TASKS.TOKENS, err));
        return Promise.reject(err);
      }
    );
  };
}

export function prepareFiles(canvases) {
  return dispatch => {
    dispatch(taskGroupStart(TASKS.PREPARE));
    return Promise.all([
      dispatch(prepareFile(FILES.EMAIL_BANNER, canvases[FILES.EMAIL_BANNER]))
    ]).then(
      actions =>
        dispatch(taskGroupComplete(TASKS.PREPARE,
          actions.reduce((prev, {meta, payload}) => u(prev, {
            [meta.file]: {$set: payload}
          }), {})
        )),
      err => {
        dispatch(taskGroupComplete(TASKS.PREPARE, err));
        return Promise.reject(err);
      }
    );
  };
}

const dimensions = {
  [FILES.EMAIL_BANNER]: [800, 200]
};
export function prepareFile(file, hybridCanvas) {
  return dispatch => {
    dispatch(taskStart(TASKS.PREPARE, file));
    const [w, h] = dimensions[file];
    return hybridCanvas.toBlob(w, h).then(
      blob => dispatch(taskComplete(TASKS.PREPARE, file, blob)),
      err => {
        dispatch(taskComplete(TASKS.PREPARE, file, err));
        return Promise.reject(err);
      }
    );
  }
}

export function uploadFiles(form, blobs) {
  return dispatch => {
    dispatch(taskGroupStart(TASKS.UPLOAD));
    return Promise.all([
      dispatch(uploadFile(form, FILES.EMAIL_BANNER, blobs[FILES.EMAIL_BANNER]))
    ]).then(
      () => dispatch(taskGroupComplete('upload')),
      err => {
        dispatch(taskGroupComplete('upload', err));
        return Promise.reject(err);
      }
    );
  };
}

const pad = num => (num < 10 ? '0' : '') + num;
const dateToYYYYMMDD = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const fileName = {
  [FILES.EMAIL_BANNER]: ({date}) => `sparkplug/${dateToYYYYMMDD(date)}-email-banner.png`
};
export function uploadFile(form, file, blob) {
  return (dispatch, getState) => {
    dispatch(taskStart(TASKS.UPLOAD, file));
    return githubUpload(fileName[file](form), blob, getState().logIn.tokens.github).then(
      () => dispatch(taskComplete(TASKS.UPLOAD, file)),
      err => {
        dispatch(taskComplete(TASKS.UPLOAD, file, err));
        return Promise.reject(err);
      }
    );
  };
}
