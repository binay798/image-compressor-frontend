import React, { useCallback, useState } from 'react';
import Icon from './../Icon/Icon';
import classes from './DropImage.module.css';
import { Button, ListItemText } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import ImageList from './../ImageList/ImageList';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import imageIcon from './../../assets/images/imageIcon.png';

function DropImage() {
  const [imageFiles, setImageFiles] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleChange = (event) => {
    setFrom(event.target.value);
  };
  const handleToChange = (e) => {
    setTo(e.target.value);
  };
  const onDrop = useCallback((acceptedFiles) => {
    setImageFiles(acceptedFiles);
    // Do something with the files
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setImgList((prev) => [...prev, binaryStr]);
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dragNotActiveElement = (
    <>
      <Icon icon='download' style={{ width: '10rem', height: '10rem' }} />
      <h1 className={classes.dropImage__head}>
        {isDragActive ? 'Drop it' : 'Drag and Drop files here'}
      </h1>
      <h2>Or</h2>
      <Button variant='outlined' color='primary'>
        Browse Files
      </Button>
    </>
  );
  return (
    <>
      {/* DROP FILE COMPONENT */}
      <div
        style={{
          background: isDragActive
            ? 'var(--color-gray)'
            : 'var(--color-gray-light)',
        }}
        className={classes.dropImage}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {dragNotActiveElement}
      </div>
      {/* IMAGE LIST COMPONENT */}
      <ImageList images={imgList} />
      {/* SELECT CONVERSION */}
      <div className={classes.dropImage__select}>
        <div className={classes.dropImage__select__one}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>From</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={from}
              label='From'
              onChange={handleChange}
            >
              <MenuItem value='jpeg' className={classes.menuItem}>
                <ListItemText>JPEG</ListItemText>
              </MenuItem>
              <MenuItem value='jpg' className={classes.menuItem}>
                <ListItemText>JPG</ListItemText>
              </MenuItem>
              <MenuItem value='webp' className={classes.menuItem}>
                <ListItemText>WEBP</ListItemText>
              </MenuItem>
              <MenuItem value='png' className={classes.menuItem}>
                <ListItemText>PNG</ListItemText>
              </MenuItem>

              <MenuItem value='gif' className={classes.menuItem}>
                <ListItemText>GIF</ListItemText>
              </MenuItem>

              <MenuItem value='tiff' className={classes.menuItem}>
                <ListItemText>TIFF</ListItemText>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <h2 style={{ color: 'var(--color-gray-dark)' }}>-------></h2>
        </div>
        <div className={classes.dropImage__select__one}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>To</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={to}
              label='To'
              onChange={handleToChange}
            >
              <MenuItem value='jpeg' className={classes.menuItem}>
                <ListItemText>JPEG</ListItemText>
              </MenuItem>
              <MenuItem value='jpg' className={classes.menuItem}>
                <ListItemText>JPG</ListItemText>
              </MenuItem>
              <MenuItem value='webp' className={classes.menuItem}>
                <ListItemText>WEBP</ListItemText>
              </MenuItem>
              <MenuItem value='png' className={classes.menuItem}>
                <ListItemText>PNG</ListItemText>
              </MenuItem>

              <MenuItem value='gif' className={classes.menuItem}>
                <ListItemText>GIF</ListItemText>
              </MenuItem>

              <MenuItem value='tiff' className={classes.menuItem}>
                <ListItemText>TIFF</ListItemText>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default DropImage;
