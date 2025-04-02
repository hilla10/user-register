import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

export const UserPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null; // Prevents rendering while redirecting

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h2 className='text-2xl font-bold mb-4'>User Dashboard</h2>
      <p className='text-gray-600'>Welcome, {user?.username}</p>
      <button
        className='mt-4 px-6 py-2 bg-red-500 text-white rounded-lg'
        onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default UserPage;
