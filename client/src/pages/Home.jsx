import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
    <div className=''>
      <Navbar/>

      <div>
        <h2 className='text-[32px] text-center'>home Page</h2>
        <p className='pt-3 text-[20px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptas temporibus excepturi ipsum ad hic eius adipisci ipsam explicabo qui recusandae a saepe voluptates soluta nihil placeat natus, obcaecati fuga.
        Necessitatibus voluptate fugiat porro dolore, iste natus tempore velit earum aliquam, iusto optio maiores officia adipisci. Repellendus ratione corporis impedit, aliquam consequuntur praesentium, aut molestiae debitis fugiat soluta adipisci illo.
        Expedita cumque nihil distinctio doloremque, nisi amet nam consequuntur dicta modi repudiandae officia? Placeat vel vero fugiat dolorum quas, quod enim velit impedit ad dicta nihil quae saepe iste. Et?</p>
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
