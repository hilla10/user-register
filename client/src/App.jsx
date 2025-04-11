import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

import PrivatePage from './pages/PrivatePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import UploadedImage from './components/UploadedImage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Service from './pages/Service';
import Contact from './pages/Contact';

const App = () => {
  return (
    <div>
      <Navbar />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Service />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/upload/:id' element={<UploadedImage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/admin'
            element={
              <PrivatePage roles={['admin']}>
                <AdminPage />
              </PrivatePage>
            }
          />

          <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </div>
  );
};

export default App;
