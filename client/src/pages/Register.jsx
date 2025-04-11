import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/Auth';
import validateForm from '../utils/validate';
const AuthForm = () => {
  const navigate = useNavigate(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [inputError, setInputError] = useState({
    username: '',
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
      setLoading(true); // Disable submit button
      if (validateForm(formData, setInputError)) {
        const response = await register(formData);

        if (response?.data?.success) {
          setFormData({ username: '', email: '', password: '' });

          // console.log(response);
          setSuccess(response.data.message);
          setError('');

          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        'Something went wrong. please try again';
      setError(errorMessage);
    } finally {
      setLoading(false); // Re-enable submit button after the request
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold text-center mb-6'>Register</h2>

        {error && (
          <p className='text-red-600 block text-[14px] font-medium text-center bg-red-100 py-2 rounded'>
            {error}
          </p>
        )}

        {success && (
          <p className='text-green-700 text-[14px] font-medium text-center'>
            {success}
          </p>
        )}

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='block font-medium'>Username</label>
            <input
              type='text'
              name='username'
              onChange={handleChange}
              value={formData.username}
              // required
              className='w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {inputError.username && (
              <span className='text-right pt-2 text-[14px] text-red-600 block w-full'>
                {inputError.username}
              </span>
            )}
          </div>

          <div>
            <label className='block font-medium'>Email</label>
            <input
              // type='email'
              name='email'
              onChange={handleChange}
              value={formData.email}
              required
              className='w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {inputError.email && (
              <span className='text-right pt-2 text-[14px] text-red-600 block  w-full'>
                {inputError.email}
              </span>
            )}
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
            {inputError.password && (
              <span className='text-right pt-2 text-[14px] text-red-600 block  w-full'>
                {inputError.password}
              </span>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-full py-2 rounded-lg transition cursor-pointer ${
              loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-bold`}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className='mt-4 text-center'>
          Already have an account?
          <Link
            to='/login'
            className='ml-1 text-blue-500 hover:underline cursor-pointer'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
