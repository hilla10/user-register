import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;
const UploadedImage = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`${apiUrl}/api/upload/${parseInt(id)}`);
        // console.log(response);
        if (response?.data?.success) {
          //   console.log('fetching successfully');
          setData(response?.data?.image?.file);
        } else {
          console.log('error fetching data');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {' '}
      <div className='max-w-[800px] flex flex-col justify-center mx-auto items-center gap-4 p-4 mt-5'>
        {data.map(({ id, file_path }) => (
          <div key={id} className=' p-2 w-full'>
            {' '}
            <img
              src={`${apiUrl}/${file_path}`}
              alt={`Uploaded file ${id}`}
              className=' object-cover rounded-lg shadow-lg'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedImage;
