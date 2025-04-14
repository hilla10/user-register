// Import the query function to execute SQL queries
import query from '../database/db.js';

// Import bcrypt to hash the password securely
import bcrypt from 'bcrypt';

const updateUser = async (formData, file, uid) => {
  try {
    // Destructure the formData object to extract user inputs
    const { username, email, password } = formData;
    const profile = file?.filename;

    const { id } = uid;

    // Generate a salt for bcrypt password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the user's password using bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    // SQL query to update the new user into the users table
    const sql = `UPDATE users SET username = ?, email = ?, password = ?, profile = ? WHERE user_id = ?`;

    // Execute the update query with the provided data
    const rows = await query(sql, [
      username,
      email,
      hashedPassword,
      profile || null,
      id,
    ]);

    // If the update fails, return an error message
    if (rows.affectedRows !== 1) {
      const message = {
        success: false,
        message: 'Failed to update data. Please try again later.',
      };
      return message;
    }

    // If update is successful, return a success message
    const message = {
      success: true,
      message: 'Record Updated successfully!',
    };
    return message;
  } catch (error) {
    console.log('Error updating user:', error.message);
    console.error(error.stack);

    // Return a generic error message in case of an unexpected error
    return {
      success: false,
      message: 'An error occurred while updating the user.',
    };
  }
};

// Export the register function for use in other modules
export default updateUser;
