import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import { login } from '../api/Auth';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const accessToken = localStorage.getItem('token');

      const response = await login(formData);
      if (response?.data?.success) {
        const token = response?.data?.token;
        if (token) {
          localStorage.setItem('token', JSON.stringify(token));

          const decodedToken = jwtDecode(token.userToken);
          setUser(decodedToken);
          setSuccess(response.data.message);

          setFormData({ email: '', password: '' });

          setTimeout(() => {
            if (decodedToken.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/user');
            }
          }, 1500);
        }
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        `Something went wrong. please try again ${err}`;
      // console.log(err);
      setError(errorMessage);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>

        {error ? (
          <p className='text-red-600 block text-[14px] font-medium text-center'>
            {error}
          </p>
        ) : (
          <p className='text-green-700 text-[14px] font-medium text-center'>
            {success}
          </p>
        )}

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='block font-medium'>Email</label>
            <input
              type='email'
              name='email'
              onChange={handleChange}
              value={formData.email}
              required
              className='w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='relative'>
            <label className='block font-medium'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              onChange={handleChange}
              value={formData.password}
              required
              className='w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <span
              className='absolute right-4 top-10 cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer'>
            Login
          </button>
        </form>

        <p className='mt-4 text-center'>
          Don't have an account?
          <Link
            to='/register'
            className='ml-1 text-blue-500 hover:underline cursor-pointer'>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
