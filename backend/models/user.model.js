// Import the query function to execute SQL queries
import query from '../database/db.js';

const user = async () => {
  try {
    
    // select the user from the database
    const q = `SELECT user_id, username, role, first_name, last_name, email, phone_number, date_of_birth FROM users;
`;

    const user = await query(q);

    if(!user) {
      const message = {
        success: false,
        message: 'User not found.',
      };
      return message;
    }

    // If insertion is successful, return a success message
    const message = {
      success: true,
      message:user,
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

// Export the register function for use in other modules
export default user;
