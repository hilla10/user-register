import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
<<<<<<< HEAD
import PrivatePage from './pages/PrivatePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import UploadedImage from './components/UploadedImage';
import Home from './pages/Home';
=======
import PrivatePage from './components/PrivatePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/unauthorized';
import UploadedImage from './components/UploadedImage';
import Home from './pages/Home';
import User from './pages/User';
import Grades from './pages/Grade';
import Teacher from './pages/Teacher';
import Update from './pages/Update';
import Create from './pages/Create';
>>>>>>> aba152f0ca37f6d5b395cc1e50073123c3c61871

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
            path='/users'
            element={
              <PrivatePage roles={['admin']}>
                <User />
              </PrivatePage>
            }
          />
          <Route
            path='/teacher'
            element={
              <PrivatePage roles={['admin', 'teacher']}>
                <Teacher />
              </PrivatePage>
            }
          />
          <Route
            path='/create'
            element={
              <PrivatePage roles={['admin', 'teacher']}>
                <Create />
              </PrivatePage>
            }
          />
          <Route
            path='/update/:id'
            element={
              <PrivatePage roles={['admin', 'teacher']}>
                <Update />
              </PrivatePage>
            }
          />
          <Route
            path='/grade'
            element={
              <PrivatePage roles={['admin', 'teacher']}>
                <Grades />
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
