import React from 'react';
import MainForm from '../containers/MainForm';
import ConnectedBannerOutput from '../containers/ConnectedBannerOutput';
import ConnectedSubmitButton from '../containers/ConnectedSubmitButton';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.outputRefPromise = new Promise(resolve => {
      this.outputRefFunc = wrappedOutput => {
        resolve(wrappedOutput.getWrappedInstance());
      };
    });
  }

  render() {
    return <div>
      <h1>Sparkplug</h1>
      <p>Enter color values and Workshop details below.</p>
      <MainForm />
      <div className='row'>
        <ConnectedBannerOutput ref={this.outputRefFunc} />
        <ConnectedSubmitButton outputRefPromise={this.outputRefPromise} />
      </div>
    </div>;
  }
}
