import axios from 'axios';
import { getBearerToken, setAccessToken } from './auth-service';

const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Type': 'application/json',
  },
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.config && error.response && error.response.status === 401 && error.config.url !== '/auth/refresh') {
      const result = await http.post('/auth/refresh')
        .then(response => response.data)
        .catch(err => Promise.reject(err));

      if (result.success) {
        const token = result.accessToken;
        setAccessToken(token);
        error.config.headers['Authorization'] = getBearerToken();
        return http(error.config);
      }
    }
    return Promise.reject(error);
  },
);

export default http;
