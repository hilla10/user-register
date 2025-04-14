import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/Auth';
import validateForm from '../utils/validate';
import Form from '../components/Form';
const AuthForm = () => {
  const navigate = useNavigate(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [formInput, setFormInput] = useState({
    username: '',
    email: '',
    password: '',
    profile: '',
  });
  const [inputError, setInputError] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password, profile } = formInput;

  const formData = new FormData();

  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('profile', profile);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file') {
      setFormInput((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Disable submit button
      if (validateForm(formInput, setInputError, false)) {
        const response = await register(formData);

        if (response?.data?.success) {
          setFormInput({ username: '', email: '', password: '' });

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

        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formInput={formInput}
          inputError={inputError}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loading={loading}
          register={loading ? 'Registering...' : 'Register'}
          image={formInput.profile}
        />

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
