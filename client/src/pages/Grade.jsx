import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import highschool from '../assets/school.jfif';
const Grade = () => {
   
    const [data, setData] = useState([]);
    const token = JSON.parse(localStorage.getItem('token')) || {};
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Make API call
          const response = await axios('http://localhost:3000/api/grades', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token?.userToken || ''}`, // Using token from localStorage
            },
          });
  
          // Check if the response contains the expected data
          if (response && response.data && response.data.data) {
            // Assuming response.data.data contains the user data
            setData(response?.data?.data?.message); // Set state with user data
          
          } else {
            console.error('Invalid response structure:', response);
          }
        } catch (error) {
          console.error('Error fetching data:', error); // Handle any fetch errors
        }
      };
  
      fetchData();
    }, [token]); // Adding token as a dependency to re-fetch if it changes
  
    // Log data when it's updated
    useEffect(() => {
      console.log('Fetched data:', data);
    }, [data]);


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
          <th className='px-4 py-2 text-left font-semibold text-gray-700'>First Name</th>
          <th className='px-4 py-2 text-left font-semibold text-gray-700'>Last Name</th>
          <th className='px-4 py-2 text-left font-semibold text-gray-700'>Section Name</th>
          <th className='px-4 py-2 text-left font-semibold text-gray-700'>Grade</th>
          <th className='px-4 py-2 text-left font-semibold text-gray-700'>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ grade_id, grade, first_name, last_name, section_name }) => (
          <tr key={grade_id} className='border-b'>
            <td className='px-4 py-2'>{grade_id}</td>
            <td className='px-4 py-2'>{first_name}</td>
            <td className='px-4 py-2'>{last_name}</td>
            <td className='px-4 py-2'>{section_name}</td>
            <td className='px-4 py-2'>{grade}</td>
            <td className='px-4 py-2'>
             
              <Link to={`/edit/${grade_id}`} className='bg-blue-600 text-white px-3 py-1 rounded-sm hover:bg-blue-700 transition mr-2'>
                Edit
              </Link>
              <button
                onClick={() => handleDelete(grade_id)}
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

export default Grade;
