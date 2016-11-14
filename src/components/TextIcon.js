import React from 'react';

export default props => {
  const {icon: Icon, style, ...rest} = props;
  return <Icon {...rest} style={{
    transform: 'translateY(25%)',
    marginTop: '-25%',
    ...style
  }} />;
};
