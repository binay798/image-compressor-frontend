import React from 'react';
import sprites from './../../assets/icons/sprites.svg';
function Icon(props) {
  const iconStyle = {
    width: '2rem',
    height: '2rem',
    ...props.style,
  };
  return (
    <svg style={iconStyle}>
      <use href={`${sprites}#${props.icon}`} />
    </svg>
  );
}

export default Icon;
