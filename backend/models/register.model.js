// Import the query function to execute SQL queries
import query from '../database/db.js';

// Import bcrypt to hash the password securely
import bcrypt from 'bcrypt';

// Import the custom module to generate a unique ID for users
import uniqueId from '../helper/generateUniqueId.js';

const register = async (formData, file) => {
  try {
    // Destructure the formData object to extract user inputs
    const { username, email, password, role } = formData;
    const profile = file ? file.filename : null;

    // SQL query to check if a user already exists with the provided email

    const q = `SELECT * FROM users WHERE email = ? OR username = ?`;

    // SQL query to check the count of admin users in the database
    const selectAdminRole = `SELECT COUNT(*) adminCount  FROM users WHERE role = ?`;

    // Execute the query to check if the user already exists based on the email
    const checkIfUserExists = await query(q, [email, username]);

    // Execute the query to check how many admins already exist in the database
    const checkAdminUser = await query(selectAdminRole, ['admin']);

    // If an admin already exists and the new user is also attempting to be an admin, return an error
    if (checkAdminUser[0].adminCount > 0 && role === 'admin') {
      const message = {
        success: false,
        message:
          'There is already an admin user in the database. Only one admin is allowed at a time. Please choose a different role for this user.',
      };
      return message;
    }

    // If the user already exists (i.e., their email is already registered), return an error
    if (checkIfUserExists.length > 0) {
      const message = {
        success: false,
        message:
          'Email or username already exists. Please use another email or username. ',
      };

      return message;
    }

    // Check for missing required fields (username, email, password)
    if (username === '' || password === '' || email === '') {
      const missingFields = [];

      // Add missing fields to the array for a custom message
      if (username === '') missingFields.push('username');
      if (password === '') missingFields.push('password');
      if (email === '') missingFields.push('email');

      // Construct the message to inform the user of the missing fields
      const message = {
        success: false,
        message: `All fields are required. Please fill in the following field(s): ${missingFields.join(
          ', '
        )}`,
      };

      return message;
    }

    // Generate a salt for bcrypt password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the user's password using bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique ID for the new user
    const newUserId = uniqueId();

    // SQL query to insert the new user into the users table
    const sql = `INSERT INTO users (user_id, username, email, password, role, profile) VALUES (?, ?, ?, ?, ?, ?)`;

    // Execute the insert query with the provided data
    const rows = await query(sql, [
      newUserId,
      username,
      email,
      hashedPassword,
      role || 'user',
      profile || null,
    ]);

    // If the insertion fails, return an error message
    if (rows.affectedRows !== 1) {
      const message = {
        success: false,
        message: 'Failed to insert data. Please try again later.',
      };
      return message;
    }

    // If insertion is successful, return a success message
    const message = {
      success: true,
      message: 'Record inserted successfully!',
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
export default register;
