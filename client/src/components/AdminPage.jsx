import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import axios from 'axios';
const AdminPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token')) || {};

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const onFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFiles) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token?.userToken || ''}`,
          },
        }
      );

      if (response?.data?.success) {
        setMessage('File uploaded successfully!');
        setMessage('File uploaded successfully!');
        setSelectedFiles(null);
        setError('');
        navigate('/');
      } else {
        setError('File upload failed!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      const errMsg = error?.response?.data?.message || 'Upload failed!';
      if (errMsg === 'Token has expired. Please log in again.') {
        setError(errMsg);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }

      setError(errMsg);
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
      <h2 className='text-3xl font-semibold text-center text-blue-600 mb-6'>
        Admin Dashboard
      </h2>
      <p className='text-lg text-gray-700 mb-4'>
        Welcome, <span className='font-semibold'>{user?.username}</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center space-y-4'>
        <input
          type='file'
          onChange={onFileChange}
          className='w-64 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer'
          multiple
        />
        <button
          disabled={loading}
          type='submit'
          className={`w-64 p-3 text-white font-medium rounded-md ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } transition duration-300`}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>

        {message ? (
          <p className='text-green-700 mt-4'>{message}</p>
        ) : (
          <p className='text-red-700 mt-4'>{error}</p>
        )}
      </form>

      <Link
        to='/login'
        className='mt-8 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300'
        onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
};

export default AdminPage;
