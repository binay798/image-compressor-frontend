import React from 'react';
import classes from './Image.module.css';

function Image(props) {
  return (
    <div className={classes.img}>
      <img className={classes.img__img} src={props.src} alt='files' />
    </div>
  );
}

export default Image;
