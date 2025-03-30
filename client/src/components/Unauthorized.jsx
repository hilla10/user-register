import React from 'react';

const Unauthorized = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='text-center p-8 bg-white shadow-xl rounded-lg max-w-md w-full'>
        <h1 className='text-4xl font-bold text-red-600 mb-4'>Unauthorized</h1>
        <p className='text-xl text-gray-700 mb-6'>
          You do not have permission to view this page.
        </p>
        <a
          href='/login'
          className='text-lg font-semibold text-blue-500 hover:text-blue-700 transition duration-300'>
          Go back to Login
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
