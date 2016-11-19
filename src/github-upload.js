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

export default async function upload(path, blob, {user, token}) {
  const b64 = await blobToBase64(blob);
  const auth = btoa(`${user}:${token}`);
  const res = await (
    process.env.NODE_ENV === 'production' ?
      fetch(`${root}${path}`, {
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
      }) :
      new Promise(r => {
        setTimeout(r, 6000, { ok: true });
      })
  );

  if (!res.ok) {
    if (res.status === 422) {
      throw new Error('Target file already exists on the server');
    }

    let errMsg = res.statusText;
    try {
      const {message} = await res.json();
      if (message) {
        errMsg += `; ${message}`;
      }
    } catch (err) {}

    throw new Error(errMsg);
  }
};
