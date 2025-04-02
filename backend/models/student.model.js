// Import the query function to execute SQL queries
import query from '../database/db.js';

const student = async () => {
  try {
    
    // select the user from the database
    const q = `SELECT user_id, first_name, last_name FROM users WHERE users.role = 'student';
;
`;

    const student = await query(q);

    if(!student) {
      const message = {
        success: false,
        message: 'student not found.',
      };
      return message;
    }

    // If insertion is successful, return a success message
    const message = {
      success: true,
      message:student,
    };
    return message;
  } catch (error) {
    console.log('Error registering user:', error.message);
    console.error(error.stack);

    // Return a generic error message in case of an unexpected error
    return {
      success: false,
      message: 'An error occurred while registering the user.',
    };
  }
};

export default student