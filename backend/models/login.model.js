// Import the query function to execute SQL queries
import query from '../database/db.js';

// Import bcrypt to hash the password securely
import bcrypt from 'bcrypt';

const login = async (formData) => {
  try {
    const { email, password } = formData;

    const q = `SELECT * FROM users WHERE email = ?`;

    const checkIfUserExists = await query(q, [email]);

    if (checkIfUserExists.length === 0) {
      const message = {
        success: false,
        message: 'Invalid email or password. Please try again.',
      };
      return message;
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      checkIfUserExists[0].password
    );

    if (!isPasswordMatch) {
      const message = {
        success: false,
        message: 'Invalid email or password. Please try again.',
      };
      return message;
    }

    const message = {
      success: true,
      message: 'Your are logged in successfully.',
      data: checkIfUserExists,
    };
    return message;
  } catch (error) {
    console.log('Error Login user:', error.message);
    console.error(error.stack);

    // Return a generic error message in case of an unexpected error
    return {
      success: false,
      message: 'An error occurred while Login the user.',
    };
  }
};

export default login;
