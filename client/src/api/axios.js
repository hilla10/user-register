import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 403) ||
      error.response.status === 401
    ) {
      // Token is invalid or expired
      localStorage.removeItem('token'); // Clear token
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
