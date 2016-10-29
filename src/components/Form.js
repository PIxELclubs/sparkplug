import React from 'react';
import TextField from 'material-ui/TextField/TextField';
import ColorPicker from './ColorPicker';
import DatePicker from './DatePicker';
import {color} from '../PropTypes';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    const createHandler = propName => {
      return (e, val) => {
        this.props.onChange && this.props.onChange(e, {
          [propName]: val
        });
      };
    };
    this.handleName = createHandler('name');
    this.handleDate = createHandler('date');
    this.handleHeadingColor = createHandler('headingColor');
    this.handleBackgroundColor = createHandler('backgroundColor');
    this.handleStop1 = createHandler('stop1');
    this.handleStop2 = createHandler('stop2');
  }

  static propTypes = {
    name: React.PropTypes.string,
    date: React.PropTypes.instanceOf(Date),
    headingColor: color,
    backgroundColor: color,
    stop1: color,
    stop2: color,
    onChange: React.PropTypes.func
  };

  shouldComponentUpdate(nextProps) {
    return this.props.name !== nextProps.name ||
      this.props.date.getTime() !== nextProps.date.getTime() ||
      this.props.headingColor !== nextProps.headingColor ||
      this.props.backgroundColor !== nextProps.backgroundColor ||
      this.props.stop1 !== nextProps.stop1 ||
      this.props.stop2 !== nextProps.stop2;
  }

  render() {
    return <div className='row'>
      <div className='col l4 s6'>
        <TextField
          floatingLabelText='Name of Workshop'
          value={this.props.name}
          onChange={this.handleName}
          fullWidth
        />
      </div>
      <div className='col l4 s6'>
        <DatePicker
          floatingLabelText='Date of Workshop'
          value={this.props.date}
          onChange={this.handleDate}
          fullWidth
        />
      </div>
      <div className='col l1 s3'>
        <ColorPicker
          floatingLabelText='Heading'
          value={this.props.headingColor}
          onChange={this.handleHeadingColor}
          fullWidth
          disableAlpha
        />
      </div>
      <div className='col l1 s3'>
        <ColorPicker
          floatingLabelText='Background'
          value={this.props.backgroundColor}
          onChange={this.handleBackgroundColor}
          fullWidth
          disableAlpha
        />
      </div>
      <div className='col l1 s3'>
        <ColorPicker
          floatingLabelText='Gradient'
          value={this.props.stop1}
          onChange={this.handleStop1}
          fullWidth
          disableAlpha
        />
      </div>
      <div className='col l1 s3'>
        <ColorPicker
          floatingLabelText='Gradient'
          value={this.props.stop2}
          onChange={this.handleStop2}
          fullWidth
          disableAlpha
        />
      </div>
    </div>;
  }
}
