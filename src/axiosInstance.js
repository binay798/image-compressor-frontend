import axios from 'axios';

// const backendUrl = 'http://localhost:8000';
const backendUrl = 'https://imageconverterbackend.herokuapp.com/';
const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default axiosInstance;
