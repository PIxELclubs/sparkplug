function generate(e) {
  e.preventDefault();
  const values = Array.from(document.querySelectorAll('input')).map(i => i.value);
  const [name, date, headingColor, backgroundColor, stop1, stop2] = values;

  let canvas = document.querySelector('#preview');
  let logo = document.querySelector('#logo').innerHTML;
  let ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, 800, 200);

  let gradient = ctx.createLinearGradient(0, 0, 800, 0);
  gradient.addColorStop(0, stop1);
  gradient.addColorStop(1, stop2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 170, 800, 30);

  let coloredLogo = logo.replace(/\${COLOR}/g, headingColor);
  let logoSource = 'data:image/svg+xml;base64,' + btoa(coloredLogo);
  let logoImg = new Image();
  logoImg.src = logoSource;
  ctx.drawImage(logoImg, 55, 60, logoImg.width * 0.6, logoImg.height * 0.6);

  ctx.font = '700 20pt Lato';
  ctx.fillStyle = stop2;
  ctx.fillText(date, 440, 50);

  ctx.font = '700 30pt Lato';
  ctx.fillStyle = headingColor;
  ctx.fillText(name, 440, 80);
}

document.querySelector('#values').addEventListener('submit', generate);