import WebFont from 'webfontloader';
import './datepicker.js';
import generate from './generator';

export {generate};
export * from './generator';

WebFont.load({
  google: {
    families: ['Lato', 'Lato:bold']
  },
  active: () => {
    window.dispatchEvent(new Event('fontsloaded'));
  }
});
