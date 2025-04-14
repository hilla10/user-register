import axios from 'axios';
import getAuth from '../utils/Auth';
import api from './axios';

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
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response;
};

const update = async (formData, id) => {
  const response = await api.put(`${apiUrl}/api/auth/update/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response;
};

const getUser = async (id) => {
  const token = await JSON.parse(localStorage.getItem('token'));
  const response = await api.get(
    `${apiUrl}/api/users/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token?.userToken || ''}`,
      },
    }
  );
  return response;
};

const getUsers = async () => {
  const token = await JSON.parse(localStorage.getItem('token'));
  const response = await api.get(`${apiUrl}/api/users`, {
    headers: {
      Authorization: `Bearer ${token?.userToken || ''}`,
    },
  });
  return response;
};

const deleteUser = async (userId) => {
  const token = await JSON.parse(localStorage.getItem('token'));
  const response = await api.delete(`${apiUrl}/api/auth/delete/${userId}`, {
    headers: {
      Authorization: `Bearer ${token?.userToken || ''}`,
    },
  });
  return response;
};

export { login, register, update, getUser, getUsers, deleteUser };
