import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/Auth';
import validateForm from '../utils/validate';
<<<<<<< HEAD
=======
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871

const AuthForm = () => {
  const navigate = useNavigate(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
<<<<<<< HEAD
    password: '',
=======
    first_name: '',
    password: '',
    last_name: '',
    role: '',
    phone_number: '',
    dob: '',
>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871
  });
  const [inputError, setInputError] = useState({
    username: '',
    email: '',
<<<<<<< HEAD
    password: '',
  });

=======
    first_name: '',
    password: '',
    last_name: '',
    role: '',
    phone_number: '',
    dob: '',
  });

  console.log(formData.role)

>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validateForm(formData, setInputError)) {
        const response = await register(formData);

        if (response?.data?.success) {
<<<<<<< HEAD
          setFormData({ username: '', email: '', password: '' });
=======
          setFormData({ username: '', email: '', password: '', role: '', first_name: '', last_name: '', phone_number: '', dob: '' });
>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871

          // console.log(response);
          setSuccess(response.data.message);

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
    }
  };

  return (
<<<<<<< HEAD
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
        <h2 className='text-2xl font-bold text-center mb-6'>Register</h2>

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
            className='w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer'>
            Register
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
=======
    <div className='min-h-screen flex flex-col items-center  bg-gray-100 w-full'>
      <Navbar/>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
  <h2 className='text-2xl font-bold text-center mb-6'>Register</h2>

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
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <div>
        <label className='block font-medium'>Username</label>
        <input
          type='text'
          name='username'
          onChange={handleChange}
          value={formData.username}
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
          type='email'
          name='email'
          onChange={handleChange}
          value={formData.email}
          required
          className='w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {inputError.email && (
          <span className='text-right pt-2 text-[14px] text-red-600 block w-full'>
            {inputError.email}
          </span>
        )}
      </div>

      <div>
        <label className='block font-medium'>First Name</label>
        <input
          type='text'
          name='first_name'
          onChange={handleChange}
          value={formData.first_name}
          required
          className='w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {inputError.first_name && (
          <span className='text-right pt-2 text-[14px] text-red-600 block w-full'>
            {inputError.first_name}
          </span>
        )}
      </div>

      <div>
        <label className='block font-medium'>Last Name</label>
        <input
          type='text'
          name='last_name'
          onChange={handleChange}
          value={formData.last_name}
          required
          className='w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {inputError.last_name && (
          <span className='text-right pt-2 text-[14px] text-red-600 block w-full'>
            {inputError.last_name}
          </span>
        )}
      </div>

      <div>
        <label className='block font-medium'>Role</label>
        <select
          name='role'
          onChange={handleChange}
          value={formData.role}
          className='w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='admin'>Admin</option>
          <option value='teacher'>Teacher</option>
          <option value='student'>Student</option>
        </select>
      </div>

      <div>
        <label className='block font-medium'>Phone No</label>
        <input
          type='text'
          name='phone_number'
          onChange={handleChange}
          value={formData.phone_number}
          required
          className='w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {inputError.phone_number && (
          <span className='text-right pt-2 text-[14px] text-red-600 block w-full'>
            {inputError.phone_number}
          </span>
        )}
      </div>

      <div>
        <label className='block font-medium'>DOB</label>
        <input
          type='date'
          name='dob'
          onChange={handleChange}
          value={formData.dob}
          required
          className='w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        {inputError.dob && (
          <span className='text-right pt-2 text-[14px] text-red-600 block w-full'>
            {inputError.dob}
          </span>
        )}
      </div>

      <div className='col-span-2'>
        <label className='block font-medium'>Password</label>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            onChange={handleChange}
            value={formData.password}
            required
            className='w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <span
            className='absolute right-4 top-4 cursor-pointer'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {inputError.password && (
          <span className='text-right pt-2 text-[14px] text-red-600 block w-full'>
            {inputError.password}
          </span>
        )}
      </div>
    </div>

    <button
      type='submit'
      className='w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer'
    >
      Register
    </button>
  </form>

  <p className='mt-4 text-center'>
    Already have an account?
    <Link to='/login' className='ml-1 text-blue-500 hover:underline cursor-pointer'>
      Login
    </Link>
  </p>
</div>




      <Footer/>
>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871
    </div>
  );
};

export default AuthForm;
