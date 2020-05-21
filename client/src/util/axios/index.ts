import axios, { AxiosInstance } from 'axios';

export const API_BASE_URL = 'http://10.0.0.222:4000/api/v1';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL
});
axiosInstance.defaults.headers['Content-Type'] = 'application/json';

export default axiosInstance;