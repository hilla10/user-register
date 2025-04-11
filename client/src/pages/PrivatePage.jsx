import React, { useEffect, useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import getAuth from '../utils/Auth';
import { useNavigate } from 'react-router-dom';

const PrivatePage = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = getAuth();
    accessToken.then((response) => {
      if (response) {
        setIsLogged(true);
        if (roles && roles.length > 0 && roles.includes(response.role)) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } else {
        setIsLogged(false);
      }
    });

    setIsChecked(true);
  }, [roles]);

  useEffect(() => {
    if (isChecked) {
      if (!isLogged) {
        navigate('/login');
      } else if (!isAuthorized) {
        navigate('/unauthorized');
      }
    }
  }, [isChecked, isLogged, isAuthorized, navigate]);

  if (!isChecked) {
    return <PacmanLoader color='#4d14ab' />;
  }

  return children;
};

export default PrivatePage;
