import FontFaceObserver from 'fontfaceobserver';
import React from 'react';

const DOMURL = window.URL || window.webkitURL || window;

function svgToImage(svg) {
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

const mediaQuery = scaleFactor => `screen and (resolution: ${scaleFactor}dppx)`;

export default class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleFactor: window.devicePixelRatio || 1
    };
    this.listenMediaQuery();
  }

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  };

  static defaultProps = {
    width: 800,
    height: 200
  };

  mediaQueryListener = e => {
    if (!e.match) {
      this.mediaQueryList.removeListener(this.mediaQueryListener);
      this.setState({
        scaleFactor: window.devicePixelRatio || 1
      });
      this.listenMediaQuery();
    }
  };

  listenMediaQuery = () => {
    this.mediaQueryList = window.matchMedia(mediaQuery(this.state.scaleFactor));
    this.mediaQueryList.addListener(this.mediaQueryListener);
  };

  redraw = (ctx, scaleFactor) => {
    ctx = ctx || this.ctx;
    scaleFactor = scaleFactor || this.state.scaleFactor;

    const {
      width,
      height,
      formattedDate,
      name,
      stop2,
      headingColor
    } = this.props;

    const s = num => num * scaleFactor;

    return svgToImage(this.svg.outerHTML).then(img => {
      ctx.drawImage(img, 0, 0, s(width), s(height));

      ctx.font = `700 ${s(20)}pt Lato`;
      ctx.fillStyle = stop2;
      ctx.fillText(formattedDate, s(350), s(76));

      ctx.font = `700 ${s(30)}pt Lato`;
      ctx.fillStyle = headingColor;
      ctx.fillText(name, s(350), s(118));
    });
  };

  toBlob = () => {
    let canvas = this.canvas;
    let promise = Promise.resolve();

    if (this.state.scaleFactor !== 1) {
      canvas = document.createElement('canvas');
      canvas.setAttribute('width', this.props.width);
      canvas.setAttribute('height', this.props.height);
      const ctx = canvas.getContext('2d');
      promise = this.redraw(ctx, 1);
    }

    return promise.then(() => {
      return new Promise(resolve => {
        canvas.toBlob(resolve);
      });
    });
  };

  render() {
    const logoPath1 = 'M86.54 122.58v-10.45h13.91l9.37 10.45h13.54V119l4.24 3.58h10.8V119l4.24 3.58h16.23v-3.22l4.24 3.22h29.17v-3.22l4.23 3.22h39.07v-13.55L223.32 96.3V73.46L209.39 58.5H98.93l-4.84 5.74-6.97-5.74h-28.7v52.31l12.37 11.78z';
    const logoPath2 = 'M94.02 71.35v27.22H77.27v8.56H65.08V63.91H84.8l9.22 7.44zm-12.2 19.83V74.44h-4.55v16.74h4.56zm30.24 15.95h-12.2V63.91h12.2v43.22zm5.84-43.22h12.25v17.42h4.55V63.91h12.2v24.93H140l6.9 6.77v11.52h-12.2V94.02h-4.55v13.11H117.9V86.5h6.9l-6.9-6.76V63.9zm63.72 43.22H152.7V63.91h28.93v10.53h-16.74v6.89h6.47v7.51h-6.47v7.76h16.75v10.53zm31.9 0h-26.05V63.91h12.2v32.7h13.85v10.52z';
    const {width, height} = this.props;
    const {scaleFactor} = this.state;

    return <div>
      <canvas ref={node => this.canvas = node} width={scaleFactor * width} height={scaleFactor * height} style={{
        width: '100%',
        maxWidth: `${width}px`
      }} />

      <svg className='hidden' ref={node => this.svg = node} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'>
        <defs>
          <linearGradient id='bottomGradient' y1='185' x2='800' y2='185' gradientUnits='userSpaceOnUse'>
            <stop stopColor={this.props.stop1} offset='0' />
            <stop stopColor={this.props.stop2} offset='1' />
          </linearGradient>
        </defs>
        <path fill={this.props.backgroundColor} d='M0 0h800v200H0z' />
        <path fill='url(#bottomGradient)' d='M0 170h800v30H0z' />
        <path stroke={this.props.headingColor} strokeMiterlimit='10' strokeWidth='2.83' fill='none' d={logoPath1} />
        <path fill={this.props.headingColor} d={logoPath2} />
        {/*
        <g fontWeight='700' fontFamily='Lato'>
          <text fill={this.props.stop2} x='350' y='76' fontSize='20pt'>
            <tspan x='350' y='76'>{this.props.formattedDate}</tspan>
          </text>
          <text fill={this.props.headingColor} x='350' y='118' fontSize='30pt'>
            <tspan x='350' y='118'>{this.props.name}</tspan>
          </text>
        </g>
        */}
      </svg>
    </div>;
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingQuality = 'high';
    this.ctx.imageSmoothingEnabled = true;
    new FontFaceObserver('Lato', {
      weight: 700
    }).load().catch(() => {}).then(() => {
      this.redraw();
    });
  }

  componentDidUpdate() {
    this.redraw();
  }
}
