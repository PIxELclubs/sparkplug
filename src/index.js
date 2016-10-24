import WebFont from 'webfontloader';
import './datepicker.js';
import generate from './generator';

export {generate};
export {logo, form, canvas, ctx} from './generator';

WebFont.load({
  google: {
    families: ['Lato', 'Lato:bold']
  },
  active: () => {
    generate();
  }
});
