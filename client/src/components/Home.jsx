import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios('http://localhost:3000/api/upload');

      setData(response.data.images.files);
    };

    fetchData();
  }, []);
  return (
    <div className='max-w-[1100px] mx-auto'>
      <div className='grid grid-cols-4 items-center justify-center gap-4 p-4 mt-5'>
        {data.map(({ id, file_path }) => (
          <div key={id} className=' p-2'>
            <Link to={`/upload/${id}`}>
              {' '}
              <img
                src={`http://localhost:3000/${file_path}`}
                alt={`Uploaded file ${id}`}
                className='w-[300px] h-[250px] object-cover rounded-lg shadow-lg'
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
