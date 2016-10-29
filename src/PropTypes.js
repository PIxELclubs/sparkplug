import React from 'react';

const noop = () => {};

export let color = noop;

// Copied from React
function PropTypeError(message) {
  this.message = message;
  this.stack = '';
}
PropTypeError.prototype = Error.prototype;

if (process.env.NODE_ENV !== 'production') {
  const colorRe = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;
  color = (...args) => {
    const inherited = React.PropTypes.string(...args);
    if (inherited instanceof Error) {
      return inherited;
    }

    const [props, propName, componentName, location, propFullName] = args;
    if (props[propName] != null && !colorRe.test(props[propName])) {
      return new PropTypeError(
        `Invalid color ${location} \`${propFullName || propName}\` supplied to \`${componentName || '<<anonymous>>'}\``
      );
    }
  };
}
