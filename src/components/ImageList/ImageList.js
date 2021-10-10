import React from 'react';
import classes from './ImageList.module.css';
import Image from './Image/Image';
import { Button } from '@mui/material';
// import Icon from './../Icon/Icon';

function ImageList(props) {
  const maxImageList = props.images.slice(0, 6);
  const totalImages = props.images.length;
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
        {maxImageList.map((item, id) => {
          return <Image key={id} src={item} />;
        })}
        {/* IF TOTAL IMAGES IS GREATER THAN 6 */}
        {totalImages > 6 ? (
          <div className={classes.remainingImages}>+{totalImages - 6} more</div>
        ) : null}
      </div>
    </div>
  );
}

export default ImageList;
