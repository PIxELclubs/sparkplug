import WebFont from 'webfontloader';
import moment from 'moment';
import generate from './generator';

export {generate};
export {logo, form, canvas, ctx} from './generator';

document.querySelector('#date').setAttribute('value', moment().format('MMMM D, YYYY'));

WebFont.load({
  google: {
    families: ['Lato', 'Lato:bold']
  },
  active: () => {
    generate();
  }
});
