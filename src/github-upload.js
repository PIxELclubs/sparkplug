const root = 'https://api.github.com/repos/PIxELclubs/static-assets/contents/';

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

export default function upload(path, blob, {user, token}) {
  return blobToBase64(blob).then(b64 => {
    const auth = btoa(`${user}:${token}`);

    return fetch(`${root}${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        path,
        message: `Create ${path}`,
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
};
