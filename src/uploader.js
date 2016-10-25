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

export default function upload(blob, date, shouldConfirm) {
  return Promise.all([
    getLogin(),
    blobToBase64(blob)
  ]).then(([{user, token}, b64]) => {
    const dateStr = dateToYYYYMMDD(date);
    const auth = btoa(`${user}:${token}`);
    const path = `sparkplug/${dateStr}-banner.png`;

    if (shouldConfirm && !confirm('Are you sure you want to upload the image now?')) {
      return;
    }

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
    });
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
}
