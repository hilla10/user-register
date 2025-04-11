import axios from 'axios';
import getAuth from '../utils/Auth';

const apiUrl = import.meta.env.VITE_API_URL;

const login = async (formData) => {
  const token = await getAuth();
  // console.log('token', token);
  const response = await axios.post(`${apiUrl}/api/auth/login`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response;
};

const register = async (formData) => {
  const response = await axios.post(`${apiUrl}/api/auth/register`, formData, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export { login, register };
