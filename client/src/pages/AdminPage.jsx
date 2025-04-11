import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import axios from 'axios';
<<<<<<< HEAD
=======
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import highschool from '../assets/school.jfif';
>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871
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
<<<<<<< HEAD
      const apiUrl = `${import.meta.env.VITE_API_URL}`;
      const response = await axios.post(`${apiUrl}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token?.userToken || ''}`,
        },
      });
=======
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
>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871

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
<<<<<<< HEAD
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
=======
    <>
    <Navbar/>
   <div className='grid items-center justify-between flex-row grid-cols-6'>
    <div className='grid col-span-1 bg-blue-600 h-screen'>
      <Sidebar/>
    </div>
   <div className='col-span-5 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
    

   <div>
<div className='mb-2 flex items-center justify-center'>
  <img src={highschool} alt="" className='w-full h-[500px] object-contain' />
</div>
<div>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis assumenda tempore nemo fuga totam perferendis laudantium ab, sit dolorum, porro accusantium blanditiis, ad eum. Accusantium facere dolore dicta rerum et.
  Repellat nisi cum veniam illum eveniet corrupti ex natus alias debitis distinctio aperiam, tempore quos quam expedita? Cumque, voluptate itaque dolor dolores consectetur culpa excepturi molestiae impedit fuga sequi ipsa.
  Asperiores maxime vel consectetur praesentium natus non! Est eius adipisci amet veritatis perferendis quasi voluptatum eum pariatur in, at architecto aut suscipit velit facilis natus sint exercitationem reprehenderit error expedita.
  Quas eveniet unde atque quidem possimus neque esse architecto est non nisi! Numquam, magnam exercitationem fugit molestias consectetur sit nisi inventore sed quidem expedita nostrum. Deserunt consequuntur velit soluta dignissimos!
  Quis veniam adipisci esse possimus ab! Voluptatibus, nemo. Blanditiis exercitationem voluptatem sint perferendis consectetur laborum accusantium eius ex incidunt assumenda laudantium modi, ad, pariatur neque magnam deleniti? Incidunt, ab recusandae!
  Expedita repellendus delectus numquam beatae vel. Expedita provident dolor eum vel vero deserunt eos dolores! Similique accusamus incidunt explicabo et dolorem. Eligendi, incidunt eveniet ab facilis laborum dolorum repellendus obcaecati?
  Quis recusandae aperiam, iste at adipisci architecto cum! Quae, praesentium obcaecati. Magnam modi sit consectetur eius quas officiis quidem? Libero, debitis eos? Voluptatibus accusantium maxime aut molestias assumenda dolorum unde.
  Saepe odit, fugit accusantium inventore, fugiat velit, officia cum tempora nesciunt nihil beatae quis quo deleniti ducimus voluptatum eveniet enim molestias aspernatur ut! Modi delectus quisquam impedit neque reiciendis veniam.
  Excepturi optio possimus porro aut voluptatibus. Non aut nam minus harum blanditiis est ratione illo culpa, repellendus fugiat eligendi labore pariatur dolores consequatur, quod numquam rem laboriosam, autem minima recusandae!
  Hic nihil earum iste vitae eveniet nostrum deleniti magnam maiores a dolor, labore minima molestiae. Sapiente aperiam eaque nobis suscipit unde beatae, ipsum labore provident asperiores sed modi quos blanditiis.</p>
</div>
   </div>

     
    </div>
   </div>
   <Footer/>
    </>
>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871
  );
};

export default AdminPage;
