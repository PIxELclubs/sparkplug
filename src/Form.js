import React from 'react';
import TextField from 'material-ui/TextField/TextField';
import ColorPicker from './ColorPicker';
import DatePicker, {formatDate} from './DatePicker';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.notifyParent = (e, obj) => {
      if (this.props.onChange) {
        this.props.onChange(e, obj);
      }
    };
  }

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
          onChange={(e, name) => this.notifyParent(e, {name})}
          fullWidth
        />
      </div>
      <div className='col l4 s6'>
        <DatePicker
          floatingLabelText='Date of Workshop'
          value={this.props.date}
          onChange={(e, date) => {
            this.notifyParent(e, {
              date,
              formattedDate: formatDate(date)
            });
          }}
          fullWidth
        />
      </div>
      <div className='col l1 s3'>
        <ColorPicker
          floatingLabelText='Heading'
          value={this.props.headingColor}
          onChange={(e, headingColor) => this.notifyParent(e, {headingColor})}
          fullWidth
          disableAlpha
        />
      </div>
      <div className='col l1 s3'>
        <ColorPicker
          floatingLabelText='Background'
          value={this.props.backgroundColor}
          onChange={(e, backgroundColor) => this.notifyParent(e, {backgroundColor})}
          fullWidth
          disableAlpha
        />
      </div>
      <div className='col l1 s3'>
        <ColorPicker
          floatingLabelText='Gradient'
          value={this.props.stop1}
          onChange={(e, stop1) => this.notifyParent(e, {stop1})}
          fullWidth
          disableAlpha
        />
      </div>
      <div className='col l1 s3'>
        <ColorPicker
          floatingLabelText='Gradient'
          value={this.props.stop2}
          onChange={(e, stop2) => this.notifyParent(e, {stop2})}
          fullWidth
          disableAlpha
        />
      </div>
    </div>;
  }
}

Form.propTypes = {
  onChange: React.PropTypes.func
};
