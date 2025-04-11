import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        student_id: '',
        section_id: '',
        grade: '',
      });
    
      const token = JSON.parse(localStorage.getItem('token')) || {};
    
      const [students, setStudents] = useState([]);
      const [sections, setSections] = useState([]);
    
      useEffect(() => {
        // Fetch students and sections for dropdown
        const fetchData = async () => {
          try {
            const studentResponse = await axios.get('http://localhost:3000/api/students', {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token?.userToken || ''}`,
              },
            });

              // Assuming the structure of the response is { success: true, data: { students: [...] } }
              setStudents(studentResponse.data.data?.message || []); //
    
            const sectionResponse = await axios.get('http://localhost:3000/api/sections', {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token?.userToken || ''}`,
              },
            });
            setSections(sectionResponse.data.data?.message || []); 
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
        
 
      }, [token?.userToken, sections, students]); // Effect depends on token change, avoid empty dependencies


      
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:3000/api/grades', formData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token?.userToken || ''}`,
            },
          });
          console.log('Grade submitted:', response.data);
          navigate('/grade'); // Redirect to the grades page after submission
        } catch (error) {
          console.error('Error submitting grade:', error);
        }
      };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full sm:w-1/2 lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Submit Grade</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student */}
          <div>
            <label className="block font-medium text-gray-700">Student</label>
            <select
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Student</option>
              {students?.map((student) => (
                <option key={student.user_id} value={student.user_id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Section */}
          <div>
            <label className="block font-medium text-gray-700">Section</label>
            <select
              name="section_id"
              value={formData.section_id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Section</option>
              {sections?.map((section) => (
                <option key={section.section_id} value={section.section_id}>
                  {section.section_name}
                </option>
              ))}
            </select>
          </div>

          {/* Grade */}
          <div>
            <label className="block font-medium text-gray-700">Grade</label>
            <input
              type="number"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
              min="0"
              max="100"
              step="0.01"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Submit Grade
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Create;
