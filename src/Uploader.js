import React from 'react';
import Dialog from 'material-ui/Dialog/Dialog';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import firebase, {getUser} from './firebase';

const root = 'https://api.github.com/repos/PIxELclubs/static-assets/contents/';

function getLogin() {
  if (!getUser()) {
    return Promise.reject(new Error('You need to sign in first before you can upload'));
  }

  return firebase.database().ref('/tokens/github').once('value')
    .then(r => r.val());
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const {result} = reader;
      resolve(result.substr(result.indexOf(',') + 1));
    });
    reader.addEventListener('error', () => {
      reject(reader.error);
    });
    reader.readAsDataURL(blob);
  });
}

const pad = num => (num < 10 ? '0' : '') + num;
function dateToYYYYMMDD(date) {
  return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}`;
}

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false
    };
  }

  render() {
    const accept = () => this.handleDialog(true);
    const decline = () => this.handleDialog(false);

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={decline}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={accept}
      />
    ];

    return <Dialog
      title='Dialog'
      actions={actions}
      open={this.state.showDialog}
      onRequestClose={decline}
    >
      Are you sure you want to upload the image now?
    </Dialog>;
  }

  upload = (blob, date, shouldConfirm) => {
    return Promise.all([
      getLogin(),
      blobToBase64(blob)
    ]).then(([{user, token}, b64]) => {
      let confirmPromise = Promise.resolve(true);

      if (shouldConfirm) {
        confirmPromise = new Promise((resolve, reject) => {
          this.handleDialog = yes => {
            resolve(yes);
            this.setState({
              showDialog: false
            });
          };
          this.setState({
            showDialog: true
          });
        });
      }

      return confirmPromise.then(yes => {
        if (!yes) return;

        const dateStr = dateToYYYYMMDD(date);
        const auth = btoa(`${user}:${token}`);
        const path = `sparkplug/${dateStr}-banner.png`;

        return fetch(`${root}${path}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({
            path,
            message: `Add banner for ${dateStr} meeting`,
            content: b64
          })
        }).then(res => {
          if (!res.ok) {
            if (res.status === 422) {
              throw new Error('Target file already exists on the server');
            }

            let errMsg = res.statusText;
            return res.json().then(({message}) => {
              if (message) {
                errMsg += `; ${message}`;
              }
            }, err => {
              // ignored
            }).then(() => {
              throw new Error(errMsg);
            });
          }
        });
      });
    });
  };
}
