import React from 'react';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import ContentSend from 'material-ui/svg-icons/content/send';

export default props => (
  <div className='col l2 m3 s12'>
    <RaisedButton
      label='Submit'
      labelPosition='before'
      icon={<ContentSend />}
      primary
      style={{
        float: 'right'
      }}
      onTouchTap={props.onTouchTap}
    />
  </div>
);
