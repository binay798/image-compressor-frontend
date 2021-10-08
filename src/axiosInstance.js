import axios from 'axios';

let backendUrl = 'https://imageconverterbackend.herokuapp.com/';
if (process.env.NODE_ENV === 'development') {
  backendUrl = 'http://localhost:8000';
}
const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

export default axiosInstance;
