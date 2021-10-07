import React, { useCallback, useState } from 'react';
import Icon from './../Icon/Icon';
import classes from './DropImage.module.css';
import { Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';

function DropImage() {
  const [imageFiles, setImageFiles] = useState([]);
  const [imgList, setImgList] = useState([]);
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

  console.log(imgList.length);
  const dragNotActiveElement = (
    <>
      <Icon icon='upload' style={{ width: '10rem', height: '10rem' }} />
      <h1 className={classes.dropImage__head}>Drag and Drop files here</h1>
      <h2>Or</h2>
      <Button variant='outlined' color='primary'>
        Browse Files
      </Button>
    </>
  );
  return (
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
  );
}

export default DropImage;
