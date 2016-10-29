import React from 'react';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';
import Popover from 'material-ui/Popover/Popover';
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import {fade, darken} from 'material-ui/utils/colorManipulator';
import {color} from './PropTypes.js';

const getStyles = (props, context, state) => {
  const {
    baseTheme,
    textField: {
      floatingLabelColor,
      focusColor,
      disabledTextColor,
      backgroundColor,
    }
  } = context.muiTheme;

  const gray = fade(props.disabled ? disabledTextColor : floatingLabelColor, 0.5);

  const styles = {
    root: {
      fontSize: 16,
      lineHeight: '24px',
      width: props.fullWidth ? '100%' : 256,
      height: props.floatingLabelText ? 72 : 48,
      display: 'inline-block',
      position: 'relative',
      backgroundColor,
      fontFamily: baseTheme.fontFamily,
    },
    floatingLabel: {
      color: state.isFocused ? focusColor : gray,
      pointerEvents: 'none'
    },
    button: {
      width: '100%',
      minWidth: '100%',
      height: '24px',
      marginTop: `${props.floatingLabelText ? 40 : 16}px`
    }
  };

  if (state.isFocused) {
    styles.floatingLabel.color = focusColor;
  }

  return styles;
};

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      anchorEl: null
    };

    this.controlled = this.props.value !== undefined;
    if (this.controlled) {
      this.handleChange = color => {
        if (this.props.onChange) {
          this.props.onChange(null, color.hex);
        }
      };
    } else {
      this.state.value = this.props.defaultValue;
      this.handleChange = color => {
        this.setState({
          value: color.hex
        });
      };
    }
  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    disabled: false,
    fullWidth: false,
    disableAlpha: false
  };

  static propTypes = {
    value: color,
    defaultValue: color,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    fullWidth: React.PropTypes.bool,
    floatingLabelText: React.PropTypes.string,
    onChange: React.PropTypes.func,

    disableAlpha: React.PropTypes.bool
  };

  focus = () => {
    this.setState({
      isFocused: true
    });
  };

  blur = () => {
    this.setState({
      isFocused: false
    });
  };

  handleTouchTap = e => {
    e.preventDefault();
    this.setState({
      isFocused: true,
      anchorEl: e.currentTarget
    });
  };

  render() {
    const {
      className,
      disabled,
      floatingLabelText,
      style,
      disableAlpha
    } = this.props;
    const {value} = this.controlled ? this.props : this.state;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    const floatingLabelTextElement = floatingLabelText && (
      <TextFieldLabel
        muiTheme={this.context.muiTheme}
        style={Object.assign(styles.floatingLabel, this.props.floatingLabelStyle)}
        shrink
        disabled={disabled}
      >
        {floatingLabelText}
      </TextFieldLabel>
    );

    const coloredButtonElement = (
      <FlatButton
        backgroundColor={value}
        style={styles.button}
        children={<div />}
        hoverColor={fade(value, 0.4)}
        onTouchTap={this.handleTouchTap}
      />
    );

    const popoverElement = (
      <Popover
        open={this.state.isFocused}
        anchorEl={this.state.anchorEl}
        onRequestClose={this.blur}
      >
        <ChromePicker
          color={value}
          onChange={this.handleChange}
          disableAlpha={disableAlpha}
        />
      </Popover>
    );

    return (
      <div
        className={className}
        style={prepareStyles(Object.assign(styles.root, style))}
      >
        {floatingLabelTextElement}
        {coloredButtonElement}
        {popoverElement}
      </div>
    );
  }
}
