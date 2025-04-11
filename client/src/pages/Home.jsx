import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios(`${apiUrl}/api/upload`);

      setData(response.data.images.files);
    };

    fetchData();
  }, []);
  return (
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
    </div>
  );
};

export default Home;
