import React from 'react';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import {formatDate} from './DatePicker';
import Form from './Form';
import BannerOutput from './BannerOutput';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      form: {
        name: 'Web Workshop 1',
        date,
        formattedDate: formatDate(date),
        headingColor: '#ffffff',
        backgroundColor: '#433a3a',
        stop1: '#ff0084',
        stop2: '#fad38d'
      }
    };
  }

  handleChange = (e, props) => {
    this.setState({
      form: {
        ...this.state.form,
        ...props
      }
    });
  };

  render() {
    return <div>
      <h1>Sparkplug</h1>
      <p>Enter color values and Workshop details below.</p>
      <Form onChange={this.handleChange} {...this.state.form} />
      <div className='row'>
        <div className='col l10 m9 s12'>
          <BannerOutput {...this.state.form} ref='output' />
        </div>
        <div className='col l2 m3 s12'>
          <RaisedButton
            label='Submit'
            labelPosition='before'
            icon={<ContentSend />}
            primary
            style={{
              float: 'right'
            }}
          />
        </div>
      </div>
    </div>;
  }
}
