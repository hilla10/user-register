// Import the query function to execute SQL queries
import query from '../database/db.js';

const section = async () => {
  try {
    
    // select the user from the database
    const q = `SELECT section_id, section_name FROM sections;
;
`;

    const section = await query(q);

    if(!section) {
      const message = {
        success: false,
        message: 'section not found.',
      };
      return message;
    }

    // If insertion is successful, return a success message
    const message = {
      success: true,
      message:section,
    };
    return message;
  } catch (error) {
    console.log('Error fetching data:', error.message);
    console.error(error.stack);

    // Return a generic error message in case of an unexpected error
    return {
      success: false,
      message: 'An error occurred while fetching data.',
    };
  }
};

export default section