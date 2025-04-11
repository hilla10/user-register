import axios from 'axios';
import getAuth from '../utils/Auth';

const apiUrl = 'http://localhost:3000/api/auth';

const login = async (formData) => {
  const token = await getAuth();
  // console.log('token', token);
  const response = await axios.post(`${apiUrl}/login`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response;
};

const register = async (formData) => {
  const response = await axios.post(`${apiUrl}/register`, formData, {
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export { login, register };
