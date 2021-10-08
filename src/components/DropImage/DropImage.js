import React, { useCallback, useState } from 'react';
import Icon from './../Icon/Icon';
import classes from './DropImage.module.css';
import { Button, CircularProgress, ListItemText } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import ImageList from './../ImageList/ImageList';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import imageIcon from './../../assets/images/imageIcon.png';
import axios from './../../axiosInstance';
import filterImages from '../../utils/filterImages';
import Notification from './../Notification/Notification';

const backendUrl = 'https://imageconverterbackend.herokuapp.com/';
// const backendUrl = 'http://localhost:8000';

function DropImage() {
  const [imageFiles, setImageFiles] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversionSuccess, setConversionSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [notification, setNotification] = useState({
    status: false,
    isError: false,
    message: '',
  });

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

  // REMOVE IMAGES
  const removeImages = () => {
    setImageFiles([]);
    setImgList([]);
  };

  // SUBMIT HANDLER
  const submitHandler = async (e) => {
    e.preventDefault();
    let fd = new FormData();
    // filter images
    const newFilteredImages = filterImages(imageFiles, to);
    // APPEND IMAGES TO FORM DATA
    newFilteredImages.forEach((file) => {
      fd.append('image', file);
    });
    fd.append('to', to);

    setLoading(true);
    setConversionSuccess(false);
    try {
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      };
      let res = await axios.post('/api/v1/image', fd, config);
      setDownloadUrl(res.data.data);
      setConversionSuccess(true);
      setNotification({
        status: true,
        isError: false,
        message: 'Ready to be downloaded',
      });
    } catch (err) {
      if (err.response) {
        err.message = err.response.data.message;
      }

      setNotification({
        status: true,
        isError: true,
        message: err.message,
      });
    }
    setLoading(false);
  };

  // DOWNLOAD CONVERTED FILES
  const downloadHandler = async (e) => {
    // e.preventDefault();
    try {
      const dl = document.createElement('a');
      dl.setAttribute(
        'href',
        `${backendUrl}api/v1/image/download/${downloadUrl.split('/')[0]}`
      );
      dl.click();
      setDownloadUrl('');
      setConversionSuccess(false);
      setImageFiles([]);
      setImgList([]);
      setTo('');
      setNotification({
        status: true,
        isError: false,
        message: 'Successfully downloaded',
      });
    } catch (err) {
      if (err.response) {
        err.message = err.response.data.message;
      }
      setNotification({
        status: true,
        isError: true,
        message: err.message,
      });
    }
  };
  return (
    <>
      {/* NOTIFICATION */}
      <Notification
        open={notification.status}
        isError={notification.isError}
        handleClose={() =>
          setNotification({ status: false, isError: false, message: '' })
        }
        message={notification.message}
      />
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
      <ImageList remove={removeImages} images={imgList} />
      {/* SELECT CONVERSION */}
      <form onSubmit={submitHandler} className={classes.dropImage__select}>
        <div className={classes.dropImage__select__one}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Convert To</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={to}
              label='Convert To'
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

              <MenuItem value='tiff' className={classes.menuItem}>
                <ListItemText>TIFF</ListItemText>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.dropImage__select__btn}>
          <Button
            disabled={loading}
            style={{ width: '100%' }}
            variant='contained'
            color='primary'
            type='submit'
          >
            {loading ? (
              <CircularProgress size={20} color='success' />
            ) : (
              'Convert'
            )}
          </Button>
        </div>
      </form>

      {/* DOWNLOAD CONVERTED FILES */}
      <div className={classes.dropImage__download}>
        {conversionSuccess ? (
          <Button onClick={downloadHandler} variant='contained' color='success'>
            Download
          </Button>
        ) : null}
      </div>
    </>
  );
}

export default DropImage;
