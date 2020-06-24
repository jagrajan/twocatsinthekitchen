import axios from 'axios';

export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api/v1';

const axiosInstance  = axios.create({
  baseURL: API_BASE_URL
});
axiosInstance.defaults.headers['Content-Type'] = 'application/json';

export default axiosInstance;
