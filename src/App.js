import React from 'react';
import {formatDate} from './DatePicker';
import Form from './Form';
import Output from './Output';

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

    this.handleChange = (e, props) => {
      this.setState({
        form: {
          ...this.state.form,
          ...props
        }
      });
    };
  }

  render() {
    return <div>
      <h1>Sparkplug</h1>
      <p>Enter color values and Workshop details below.</p>
      <Form onChange={this.handleChange} {...this.state.form} />
      <div className='row'>
        <div className='col m9 s12'>
          <Output {...this.state.form} ref='output' />
        </div>
      </div>
    </div>;
  }
}
