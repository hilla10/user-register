import { jwtDecode } from 'jwt-decode';

const getAuth = async () => {
  const token = await JSON.parse(localStorage.getItem('token'));

  try {
    if (token) {
      const decoded = jwtDecode(token.userToken);
      return decoded;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Invalid token', error);
  }
};

export default getAuth;
