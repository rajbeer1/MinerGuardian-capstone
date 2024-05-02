import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://sih-backend-production.up.railway.app',
});

export default axiosClient;