export function init() {
  [...document.querySelectorAll('.datepicker')].forEach(el => {
    const $el = $(el);
    const form = $el.parents('form')[0];
    const picker = $el.pickadate({
      select: new Date(),
      format: 'mmmm d, yyyy',
      onSet: () => {
        // better than nothing
        form.dispatchEvent(new Event('input'));
      }
    }).pickadate('picker');

    picker.set('select', new Date());
  });
}

export function getDate(el) {
  return $(el).data('pickadate').get('select').obj;
}
