import React from 'react';
import isBrowser from 'is-in-browser';

const DOMURL = isBrowser && (window.URL || window.webkitURL || window);

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

export default class HybridCanvas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scaleFactor: isBrowser && window.devicePixelRatio || 1
    };
  }

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  };

  static defaultProps = {
    width: 300,
    height: 150
  };

  mediaQueryListener = e => {
    if (!e.match) {
      this.mediaQueryList.removeListener(this.mediaQueryListener);
      this.setState({
        scaleFactor: isBrowser && window.devicePixelRatio || 1
      });
      this.listenMediaQuery();
    }
  };

  listenMediaQuery = () => {
    this.mediaQueryList = window.matchMedia(mediaQuery(this.state.scaleFactor));
    this.mediaQueryList.addListener(this.mediaQueryListener);
  };

  redraw = async (ctx, scaleFactor) => {
    ctx = ctx || this.ctx;
    scaleFactor = scaleFactor || this.state.scaleFactor;

    const {
      width,
      height
    } = this.props;

    const s = num => num * scaleFactor;

    const img = await svgToImage(this.svg.outerHTML);
    ctx.drawImage(img, 0, 0, s(width), s(height));
    this.props.draw && this.props.draw(ctx, scaleFactor);
  };

  toBlob = async (w, h) => {
    w = w || this.props.width;
    h = h || this.props.height;

    let canvas = this.canvas;
    let reqScale = w / this.props.width;

    if (this.state.scaleFactor !== reqScale) {
      canvas = document.createElement('canvas');
      canvas.setAttribute('width', w);
      canvas.setAttribute('height', h);
      const ctx = canvas.getContext('2d');
      await this.redraw(ctx, reqScale);
    }

    return await new Promise(resolve => {
      canvas.toBlob(resolve);
    });
  };

  render() {
    const {width, height, children} = this.props;
    const {scaleFactor} = this.state;

    return <div>
      <canvas ref={node => this.canvas = node} width={scaleFactor * width} height={scaleFactor * height} style={{
        width: '100%',
        maxWidth: `${width}px`
      }} />

      <svg className='hidden' ref={node => this.svg = node} xmlns='http://www.w3.org/2000/svg' width={width} height={height}>
        {children}
      </svg>
    </div>;
  }

  componentDidMount() {
    this.listenMediaQuery();
    this.ctx = this.canvas.getContext('2d');
    this.ctx.imageSmoothingQuality = 'high';
    this.ctx.imageSmoothingEnabled = true;
  }

  componentDidUpdate() {
    this.redraw();
  }
}
