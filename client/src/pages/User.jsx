import React, { use, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const User = () => {
   

    const [data, setData] = useState([]);
    const token = JSON.parse(localStorage.getItem('token')) || {};
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Make API call
          const response = await axios('http://localhost:3000/api/users', {
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
    <div>
        <Navbar/>
        <div className='flex items-center flex-col justify-center h-screen'>
            <h1 className='text-3xl font-bold'>Welcome to the User Page</h1>
            

            <div className="overflow-x-auto">
    <table className="min-w-full table-auto border-collapse bg-white shadow-lg">
        <thead className="bg-gray-100 text-gray-700">
            <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Username</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">First Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Last Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Phone Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">DOB</th>
            </tr>
        </thead>

        <tbody className="text-gray-700">
{
    data.map(({user_id, username, role, first_name, last_name, email, phone_number, dob}) => (
        <tr className="border-b hover:bg-gray-50">

        <td className="px-6 py-4 text-sm font-medium">{user_id}</td>
        <td className="px-6 py-4 text-sm">{username}</td>
        <td className="px-6 py-4 text-sm">{role}</td>
        <td className="px-6 py-4 text-sm">{first_name}</td>
        <td className="px-6 py-4 text-sm">{last_name}</td>
        <td className="px-6 py-4 text-sm">{email}</td>
        <td className="px-6 py-4 text-sm">{phone_number}</td>
        <td className="px-6 py-4 text-sm">{dob}</td>
    </tr>
    ))
}
           
        </tbody>
    </table>
</div>

            </div>
    </div>
  )
}

export default User