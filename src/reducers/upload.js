import u from 'immutability-helper';
import handleActions from 'redux-actions/lib/handleActions';
import {
  UPLOAD_START,
  TASK_START,
  TASK_COMPLETE,
  TASK_GROUP_COMPLETE,
  UPLOAD_COMPLETE,
  RESET_UPLOAD_PROGRESS,
  TASKS,
  FILES
} from '../actions';

const initialState = {
  active: false,
  status: 'pending',
  tasks: [
    'pending',
    'pending',
    'pending'
  ],
  progress: 0,
  logs: []
};

const taskMap = {
  [TASKS.TOKENS]: 0,
  [`${TASKS.PREPARE} ${FILES.EMAIL_BANNER}`]: 1,
  [`${TASKS.UPLOAD} ${FILES.EMAIL_BANNER}`]: 2
};

const taskGroupMap = {
  [TASKS.TOKENS]: [0],
  [TASKS.PREPARE]: [1],
  [TASKS.UPLOAD]: [2]
};

const progressWeighting = {
  [TASKS.TOKENS]: 0.1,
  [TASKS.PREPARE]: 0.2 / FILES.length,
  [TASKS.UPLOAD]: 0.7 / FILES.length
};

const msgFuncs = {
  [TASKS.TOKENS]: ({payload: p}) => `Failed to fetch security tokens: ${p.message}`,
  [TASKS.PREPARE]: ({payload: p, meta: m}) => `Failed to convert ${m.file} to PNG: ${p.message}`,
  [TASKS.UPLOAD]: ({payload: p, meta: m}) => `Failed to upload ${m.file}: ${p.message}`
};

const getTaskKey = m => taskMap[m.task + (m.file && ` ${m.file}`)];

const logIfError = action => action.error ? ({
  $push: [{
    type: 'error',
    message: msgFuncs[action.meta.task](action)
  }]
}) : null;

const skip = ({task}) => {
  const idxs = taskGroupMap[task];
  const lastIdx = idxs.slice(-1)[0];
  return tasks => (
    tasks.reduce((prev, cur, i) => (
      prev.concat([
        i < idxs[0] ?
          cur :
          i <= lastIdx && ['complete', 'error'].includes(cur) ?
            cur :
            'skipped'
      ])
    ), [])
  );
};

export default handleActions({
  [UPLOAD_START]: () => ({
    ...initialState,
    active: true,
    status: 'loading'
  }),
  [TASK_START]: (state, action) => u(state, {
    tasks: {
      [getTaskKey(action.meta)]: {
        $set: 'loading'
      }
    }
  }),
  [TASK_COMPLETE]: (state, action) => u(state, {
    tasks: {
      [getTaskKey(action.meta)]: {
        $set: action.error ? 'error' : 'complete'
      },
    },
    progress: {
      $apply: p => p + progressWeighting[action.meta.task]
    },
    logs: logIfError(action)
  }),
  [TASK_GROUP_COMPLETE]: {
    throw: (state, action) => u(state, {
      tasks: {
        $apply: skip(action.meta)
      }
    })
  },
  [UPLOAD_COMPLETE]: (state, action) => u(state, {
    status: {
      $set: action.error ? 'error' : 'complete'
    },
    progress: {
      $set: 1
    }
  }),
  [RESET_UPLOAD_PROGRESS]: ({}) => initialState
}, initialState);
