import { createContext, useContext, useEffect, useState } from 'react';

import getAuth from '../src/utils/Auth';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
          // Decode token and set user
          const decodedUser = jwtDecode(token.userToken);
          setUser(decodedUser);

          // Optional: Validate token with API
          const user = await getAuth();
          if (!user) {
            logout(); // Logout if the token is invalid
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
        logout();
      }
    };

    initializeAuth();
  }, []);

  const values = {
    user,
    isLogged: !!user,
    isAdmin: user?.role === 'admin',
    setUser,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default useAuth;
