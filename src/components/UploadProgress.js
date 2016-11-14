import React from 'react';
import LinearProgress from 'material-ui/LinearProgress/LinearProgress';
import transitions from 'material-ui/styles/transitions';
import ActionInfo from 'material-ui/svg-icons/action/info';
import AlertError from 'material-ui/svg-icons/alert/error';
import TextIcon from './TextIcon';

const icons = {
  error: AlertError,
  info: ActionInfo
};

export default class UploadProgress extends React.PureComponent {
  render() {
    return <LinearProgress
      mode='determinate'
      max={1}
      value={this.props.progress}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        opacity: this.props.active ? 1 : 0,
        transition: transitions.easeOut(null, 'opacity')
      }}
    />;
  }

  componentDidUpdate(oldProps) {
    if (this.props.autoHideDuration &&
      this.props.progress === 1 && oldProps.progress !== 1
    ) {
      setTimeout(() => {
        this.props.onRequestClose && this.props.onRequestClose('timeout');
      }, this.props.autoHideDuration);
    }
  }
}
