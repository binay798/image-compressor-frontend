import React from 'react';
import classes from './ImageList.module.css';
import Image from './Image/Image';

function ImageList(props) {
  return (
    <div className={classes.list}>
      <h4 className={classes.list__heading}>Dropped Images</h4>
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
