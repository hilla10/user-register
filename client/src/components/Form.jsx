import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import profile_pic from '../assets/profile.png';
const apiUrl = import.meta.env.VITE_API_URL;
const Form = ({
  handleSubmit,
  handleChange,
  formInput,
  inputError,
  showPassword,
  setShowPassword,
  loading,
  register,
  update,
  image,
}) => {
  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      {/* Username */}
      <div>
        <label className='block font-medium mb-1'>Username</label>
        <input
          type='text'
          name='username'
          onChange={handleChange}
          value={formInput.username}
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {inputError.username && (
          <p className='text-sm text-red-600 mt-1'>{inputError.username}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className='block font-medium mb-1'>Email</label>
        <input
          type='email'
          name='email'
          onChange={handleChange}
          value={formInput.email}
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {inputError.email && (
          <p className='text-sm text-red-600 mt-1'>{inputError.email}</p>
        )}
      </div>

      {/* Password */}
      <div className='relative'>
        <label className='block font-medium mb-1'>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name='password'
          onChange={handleChange}
          value={formInput.password}
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <span
          className='absolute right-4 top-9 text-gray-600 cursor-pointer'
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {inputError.password && (
          <p className='text-sm text-red-600 mt-1'>{inputError.password}</p>
        )}
      </div>

      <div>
        <label className='block font-medium text-gray-700 cursor-pointer'>
          <div className='mt-2 flex items-center gap-4'>
            <label className='relative w-14 h-14'>
              <img
                src={
                  image instanceof File
                    ? URL.createObjectURL(image)
                    : image
                    ? `${apiUrl}/upload/${image} `
                    : profile_pic
                }
                alt='Profile'
                className='w-full h-full rounded-full border object-cover cursor-pointer hover:opacity-80 transition'
              />
              <input
                type='file'
                name='profile'
                onChange={handleChange}
                accept='image/*'
                className='absolute inset-0 opacity-0 cursor-pointer'
              />
            </label>
            <span className='text-sm text-blue-600 font-medium'>
              Click to upload image
            </span>
          </div>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        disabled={loading}
        className={`w-full py-2 mb-2 rounded-lg transition font-semibold ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
        } text-white`}>
        {register ? register : update}
      </button>
    </form>
  );
};

export default Form;
