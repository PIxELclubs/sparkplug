const canvas = document.querySelector('#preview');
const logo = document.querySelector('#logo');
const form = document.querySelector('#values');
const ctx = canvas.getContext('2d');

function svgToImage(svg) {
  const DOMURL = window.URL || window.webkitURL || window;

  return new Promise(fulfill => {
    const img = new Image();
    const blob = new Blob([svg], {type: 'image/svg+xml'});
    const url = DOMURL.createObjectURL(blob);
    img.onload = () => {
      fulfill(img);
      DOMURL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

function generate() {
  const values = [...form.querySelectorAll('input')].map(i => i.value);
  const [name, date, headingColor, backgroundColor, stop1, stop2] = values;

  ctx.textBaseline = 'top';

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, 800, 200);

  let gradient = ctx.createLinearGradient(0, 0, 800, 0);
  gradient.addColorStop(0, stop1);
  gradient.addColorStop(1, stop2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 170, 800, 30);

  let coloredLogo = logo.innerHTML.replace(/\${COLOR}/g, headingColor);
  svgToImage(coloredLogo).then(logoImg => {
    ctx.drawImage(logoImg, 55, 60, logoImg.width * 0.6, logoImg.height * 0.6);

    ctx.font = '700 20pt Lato';
    ctx.fillStyle = stop2;
    ctx.fillText(date, 440, 50);

    ctx.font = '700 30pt Lato';
    ctx.fillStyle = headingColor;
    ctx.fillText(name, 440, 80);
  });
}

form.addEventListener('input', generate);
form.addEventListener('submit', e => {
  e.preventDefault();
  generate();
});

WebFont.load({
  google: {
    families: ['Lato', 'Lato:bold']
  },
  active: () => {
    generate();
  }
});
