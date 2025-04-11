import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import PrivatePage from './pages/PrivatePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import UploadedImage from './components/UploadedImage';
import Home from './pages/Home';

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
