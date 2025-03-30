import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import UserPage from './components/UserPage';
import AdminPage from './components/AdminPage';
import PrivatePage from './components/PrivatePage';
import Login from './components/Login';
import Register from './components/Register';
import Unauthorized from './components/unauthorized';
import UploadedImage from './components/UploadedImage';
import Home from './components/Home';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
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
          <Route
            path='/user'
            element={
              <PrivatePage roles={['user']}>
                <UserPage />
              </PrivatePage>
            }
          />

          <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
