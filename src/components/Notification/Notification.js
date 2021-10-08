import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function Notification(props) {
  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {props.isError ? (
          <Alert
            onClose={props.handleClose}
            severity='error'
            sx={{ width: '100%' }}
          >
            {props.message}
          </Alert>
        ) : (
          <Alert
            onClose={props.handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            {props.message}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}

export default Notification;
