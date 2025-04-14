import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import Modal from '../components/Modal';
import Form from '../components/Form';
import validateForm from '../utils/validate';
import { deleteUser, getUser, getUsers, update } from '../api/Auth';
import Table from '../components/Table';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Admin = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  // Function to open the modal with a specific user's ID
  const openModal = (userId) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const { username, email, password, profile } = formInput;

  const formData = new FormData();

  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('profile', profile);

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

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file') {
      setFormInput((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUser(selectedUserId);
      const { username, email, profile } = response.data.data.user[0];

      setFormInput({
        username: username || '',
        email: email || '',
        password: '', // reset password for editing
        profile: profile || null,
      });
    };

    if (selectedUserId) {
      fetchData();
    }
  }, [selectedUserId, isModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsers();
      setData(response.data.data.user);
    };

    fetchData();
  }, [selectedUserId, isModalOpen]);

  const handleDelete = async (userId) => {
    try {
      const response = await deleteUser(userId);
      toast.success('hello');
      if (response?.data?.success) {
        // Update the client state by removing the deleted user
        setData((prevData) =>
          prevData.filter((user) => user.user_id !== userId)
        );

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        'Something went wrong. please try again';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Disable submit button

      if (validateForm(formInput, setInputError, true)) {
        const response = await update(formData, selectedUserId);

        if (response?.data?.success) {
          console.log(response);
          setSuccess(response.data.message);
          toast.success(response.data.message);
          setError('');
          setModalOpen(false);
        }
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        'Something went wrong. please try again';
      setError(errorMessage);
      toast.error(errorMessage, {});
    } finally {
      setLoading(false); // Re-enable submit button after the request
    }
  };

  if (!user) return null;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        progress={undefined}
        theme='light'
        transition={Bounce}
      />
      <h2 className='text-3xl font-semibold text-center text-blue-600 mb-6'>
        Admin Dashboard
      </h2>
      <p className='text-lg text-gray-700 mb-4'>
        Welcome, <span className='font-semibold'>{user?.username}</span>
      </p>

      {/* display user in table */}
      <Table data={data} openModal={openModal} handleDelete={handleDelete} />

      {/* modal to update user */}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {' '}
        <h2 className='text-xl font-semibold mb-4'>Update User</h2>
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
          register={loading ? 'Updating...' : 'Update'}
          image={formInput.profile}
        />
        <button
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer'
          onClick={() => setModalOpen(false)}>
          Close
        </button>
      </Modal>
      <Link
        to='/login'
        className='mt-8 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300'
        onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
};

export default Admin;
