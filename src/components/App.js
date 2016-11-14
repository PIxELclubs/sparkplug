import React from 'react';
import MainForm from '../containers/MainForm';
import ConnectedSnackbar from '../containers/Snackbar.js';
import ConnectedBannerOutput from '../containers/ConnectedBannerOutput';
import ConnectedLogInButton from '../containers/ConnectedLogInButton';
import ConnectedSubmitButton from '../containers/ConnectedSubmitButton';
import ConnectedUploadProgress from '../containers/ConnectedUploadProgress';

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
      <ConnectedLogInButton />
      <h1>Sparkplug</h1>
      <p>Enter color values and Workshop details below.</p>
      <MainForm />
      <div className='row'>
        <ConnectedBannerOutput ref={this.outputRefFunc} />
        <ConnectedSubmitButton outputRefPromise={this.outputRefPromise} />
      </div>
      <ConnectedUploadProgress />
      <ConnectedSnackbar />
    </div>;
  }
}
