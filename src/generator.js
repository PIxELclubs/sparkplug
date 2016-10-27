import upload from './uploader';
import {getDate} from './datepicker';

export const logo = document.querySelector('#logo');
export const form = document.querySelector('#values');
export const date = document.querySelector('#date');
export const canvas = document.querySelector('#preview');
export const ctx = canvas.getContext('2d');

function svgToImage(svg) {
  const DOMURL = window.URL || window.webkitURL || window;

  return new Promise(resolve => {
    const img = new Image();
    const blob = new Blob([svg], {type: 'image/svg+xml'});
    const url = DOMURL.createObjectURL(blob);
    img.onload = () => {
      resolve(img);
    };
    img.src = url;
  });
}

function canvasToBlob() {
  return new Promise(resolve => {
    canvas.toBlob(resolve, 'image/png');
  });
}

export function init() {
  form.addEventListener('input', generate);
  form.addEventListener('submit', e => {
    e.preventDefault();

    generate().then(() => {
      return canvasToBlob();
    }).then(blob => {
      return upload(blob, getDate(date), true);
    }).then(() => {
      window.dispatchEvent(new CustomEvent('upload-success'));
    }).catch(err => {
      if (err === 'not an error') {
        return;
      }

      window.dispatchEvent(new CustomEvent('upload-error', {
        detail: {
          message: err.message,
          err
        }
      }));
    });
  });

  window.addEventListener('fontsloaded', generate);
}
