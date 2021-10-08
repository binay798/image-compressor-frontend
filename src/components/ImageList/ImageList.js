import React from 'react';
import classes from './ImageList.module.css';
import Image from './Image/Image';
import { Button } from '@mui/material';
// import Icon from './../Icon/Icon';

function ImageList(props) {
  return (
    <div className={classes.list}>
      <div className={classes.list__top}>
        <h4 className={classes.list__heading}>Dropped Images</h4>
        {props.images.length !== 0 ? (
          <Button onClick={props.remove} variant='outlined' color='error'>
            Remove all
          </Button>
        ) : null}
      </div>
      {props.images.length === 0 ? (
        <p className={classes.list__para}>No images</p>
      ) : null}
      <div className={classes.list__container}>
        {props.images.map((item, id) => {
          return <Image key={id} src={item} />;
        })}
      </div>
    </div>
  );
}

export default ImageList;
