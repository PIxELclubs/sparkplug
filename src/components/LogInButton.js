import React from 'react';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import FlatButton from 'material-ui/FlatButton/FlatButton';

export default ({loggingIn, user, onTouchTap}) => (
  <div
    style={{
      float: 'right'
    }}
  >
    {
      loggingIn ?
        <CircularProgress /> :
        <FlatButton
          label={user ? 'Sign Out' : 'Sign In'}
          primary
          onTouchTap={onTouchTap}
        />
    }
  </div>
);
