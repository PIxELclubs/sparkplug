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
      DOMURL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

export default function generate() {
  const values = [...form.querySelectorAll('input')].map(i => i.value);
  const [name, dateStr, headingColor, backgroundColor, stop1, stop2] = values;

  ctx.textBaseline = 'top';

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, 800, 200);

  let coloredLogo = logo.innerHTML.replace(/\${COLOR}/g, headingColor);
  const svgPromise = svgToImage(coloredLogo).then(logoImg => {
    ctx.imageSmoothingQuality = 'high';
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(logoImg, 55, 55, 180, 69.6);
  });

  let gradient = ctx.createLinearGradient(0, 0, 800, 0);
  gradient.addColorStop(0, stop1);
  gradient.addColorStop(1, stop2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 170, 800, 30);

  ctx.font = '700 20pt Lato';
  ctx.fillStyle = stop2;
  ctx.fillText(dateStr, 400, 50);

  ctx.font = '700 30pt Lato';
  ctx.fillStyle = headingColor;
  ctx.fillText(name, 400, 80);

  return svgPromise;
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
