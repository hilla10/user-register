import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import highschool from '../assets/school.jfif';
const Teacher = () => {
    const [data, setData] = useState([]);

    const token = JSON.parse(localStorage.getItem('token')) || {};

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios('http://localhost:3000/api/grades', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token?.userToken || ''}`,
                    },
                });

                if (response && response.data && response.data.data) {
                    setData(response?.data?.data?.message);
                } else {
                    console.error('Invalid response structure:', response);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

fetchData();
    }, [data])

  return (
    <>
    <Navbar/>
    <div className='flex min-h-screen bg-blue-500 justify-center items-center'>
  <div className='w-full sm:w-2/3 lg:w-1/2 bg-white rounded-lg p-6'>
    <h2 className='text-2xl font-semibold text-center mb-6'>Grade List</h2>
    <div className='flex justify-end mb-4'>
      <Link to='/create' className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition'>
        Create +
      </Link>
    </div>

    <table className='min-w-full table-auto'>
      <thead>
        <tr className='border-b'>
          <th className='px-4 py-2 text-left font-semibold text-gray-700'>ID</th>
          <th className='px-4 py-2 text-left font-semibold text-gray-700'>Student Id</th>
          <th className='px-4 py-2 text-left font-semibold text-gray-700'>Secion Id</th>
          <th className='px-4 py-2 text-left font-semibold text-gray-700'>Grade</th>
          <th className='px-4 py-2 text-left font-semibold text-gray-700'>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ ID, Name, Email }) => (
          <tr key={ID} className='border-b'>
            <td className='px-4 py-2'>{ID}</td>
            <td className='px-4 py-2'>{Name}</td>
            <td className='px-4 py-2'>{Email}</td>
            <td className='px-4 py-2'>
              <Link to={`/read/${ID}`} className='bg-blue-500 text-white px-3 py-1 rounded-sm hover:bg-blue-600 transition mr-2'>
                Read
              </Link>
              <Link to={`/edit/${ID}`} className='bg-blue-600 text-white px-3 py-1 rounded-sm hover:bg-blue-700 transition mr-2'>
                Edit
              </Link>
              <button
                onClick={() => handleDelete(ID)}
                className='bg-red-500 text-white px-3 py-1 rounded-sm hover:bg-red-600 transition'>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

   <Footer/>
    </>
  );
};

export default Teacher;
