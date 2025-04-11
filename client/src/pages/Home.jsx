import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871
const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
<<<<<<< HEAD
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios(`${apiUrl}/api/upload`);
=======
      const response = await axios('http://localhost:3000/api/upload');
>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871

      setData(response.data.images.files);
    };

    fetchData();
  }, []);
  return (
<<<<<<< HEAD
    <div className='max-w-[1100px] mx-auto'>
      {data.length > 0 ? (
        <div className='grid grid-cols-4 items-center justify-center gap-4 p-4 mt-5'>
          {data.map(({ id, file_path }) => (
            <div key={id} className=' p-2'>
              <Link to={`/upload/${id}`}>
                {' '}
                <img
                  src={`${import.meta.env.VITE_API_URL}/${file_path}`}
                  alt={`Uploaded file ${id}`}
                  className='w-[300px] h-[250px] object-cover rounded-lg shadow-lg'
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className='text-center mt-10 w-full mx-auto'>
            <h2 className='text-xl text-gray-600 font-semibold'>
              There are no images available
            </h2>
            <p className='text-sm text-gray-400 mt-2'>
              It seems there are no images to display at the moment.
            </p>
          </div>
        </>
      )}
=======
    <div className=''>
      <Navbar/>

      <div>
        <h2 className='text-[32px] text-center'>home Page</h2>
        <p className='pt-3 text-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptas temporibus excepturi ipsum ad hic eius adipisci ipsam explicabo qui recusandae a saepe voluptates soluta nihil placeat natus, obcaecati fuga.
        Necessitatibus voluptate fugiat porro dolore, iste natus tempore velit earum aliquam, iusto optio maiores officia adipisci. Repellendus ratione corporis impedit, aliquam consequuntur praesentium, aut molestiae debitis fugiat soluta adipisci illo.
        Expedita cumque nihil distinctio doloremque, nisi amet nam consequuntur dicta modi repudiandae officia? Placeat vel vero fugiat dolorum quas, quod enim velit impedit ad dicta nihil quae saepe iste. Et?</p>
      </div>

      <Footer/>
>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871
    </div>
  );
};

export default Home;
