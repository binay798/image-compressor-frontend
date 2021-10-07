import React from 'react';
import Icon from './../Icon/Icon';
import classes from './DropImage.module.css';
import { Button } from '@mui/material';

function DropImage() {
  return (
    <div className={classes.dropImage}>
      <Icon icon='upload' style={{ width: '10rem', height: '10rem' }} />
      <h1 className={classes.dropImage__head}>Drag and Drop files here</h1>
      <h2>Or</h2>
      <Button variant='outlined' color='primary'>
        Browse Files
      </Button>
    </div>
  );
}

export default DropImage;
