// Import the query function to execute SQL queries
import query from '../database/db.js';

const user = async () => {
  try {
    // select the user from the database
    const q = `SELECT user_id, username, role, email, profile  FROM users;
`;

    const user = await query(q);

    if (!user) {
      const message = {
        success: false,
        message: 'User not found.',
      };
      return message;
    }

    // If insertion is successful, return a success message
    const message = {
      success: true,
      user: user,
    };
    return message;
  } catch (error) {
    console.log('Error fetching user:', error.message);
    console.error(error.stack);

    // Return a generic error message in case of an unexpected error
    return {
      success: false,
      message: 'An error occurred while fetching the user.',
    };
  }
};

export const getUser = async (uid) => {
  try {
    // select the user from the database
    const { id } = uid;
    const q = `SELECT user_id, username, role, email, profile  FROM users WHERE user_id = ?;
`;

    const user = await query(q, [id]);

    if (!user) {
      const message = {
        success: false,
        message: 'User not found.',
      };
      return message;
    }

    // If insertion is successful, return a success message
    const message = {
      success: true,
      user: user,
    };
    return message;
  } catch (error) {
    console.log('Error fetching user:', error.message);
    console.error(error.stack);

    // Return a generic error message in case of an unexpected error
    return {
      success: false,
      message: 'An error occurred while fetching the user.',
    };
  }
};

export const deleteUser = async (uid) => {
  try {
    // select the user from the database
    const { id } = uid;
    const q = `DELETE FROM users WHERE user_id = ?`;

    const user = await query(q, [id]);

    if (!user) {
      const message = {
        success: false,
        message: 'User not found.',
      };
      return message;
    }

    // If insertion is successful, return a success message
    const message = {
      success: true,
      message: 'User Deleted Successfully',
    };
    return message;
  } catch (error) {
    console.log('Error fetching user:', error.message);
    console.error(error.stack);

    // Return a generic error message in case of an unexpected error
    return {
      success: false,
      message: 'An error occurred while deleting  the user.',
    };
  }
};

export default user;
