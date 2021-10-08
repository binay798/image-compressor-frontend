import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://imageconverterbackend.herokuapp.com/',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default axiosInstance;
