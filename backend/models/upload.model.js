// Import the query function to execute SQL queries
// import query from '../database/db.js';
import fileQuery from '../database/db.js';

const uploadFile = async (files) => {
  try {
    if (!files || files.length === 0) {
      const message = {
        success: false,
        message: 'No file uploaded',
      };
      return message;
    }

    const q = `INSERT INTO profile_pictures (file_path) VALUES ?`;

    // Get the file path after the file has been uploaded
    const filePaths = files.map((file) => file.path);
    // Map filePaths into a format suitable for batch insert
    const values = filePaths.map((filePath) => [filePath]);
    // console.log('Values to be inserted:', values);
    const rows = await fileQuery(q, [values]);
    // console.log(rows);
    if (rows.affectedRows === 0) {
      const message = {
        success: false,
        message: 'Failed to insert data. Please try again later.',
      };
      return message;
    }

    const message = {
      success: true,
      message: 'Record inserted successfully!',
    };
    return message;
  } catch (error) {
    console.log('Error uploading file:', error.message);
    console.error(error.stack);

    // Return a generic error message in case of an unexpected error
    return {
      success: false,
      message: 'An error occurred while uploading the file.',
    };
  }
};

export const getData = async () => {
  try {
    const q = `SELECT * FROM profile_pictures`;
    const files = await fileQuery(q);

    if (!files) {
      const message = {
        success: false,
        message: 'Failed to Fetch Data',
      };
      return message;
    }

    const message = {
      success: true,
      files,
    };
    return message;
  } catch (error) {
    console.log('Error fetching file:', error.message);
    console.error(error.stack);

    // Return a generic error message in case of an unexpected error
    return {
      success: false,
      message: 'An error occurred while fetching the file.',
    };
  }
};

export const getDataById = async (id) => {
  try {
    const q = `SELECT * FROM profile_pictures WHERE id = ? `;
    const file = await fileQuery(q, [id]);

    if (!file) {
      const message = {
        success: false,
        message: 'Failed to Fetch Data',
      };
      return message;
    }

    const message = {
      success: true,
      file,
    };
    return message;
  } catch (error) {
    console.log('Error fetching file:', error.message);
    console.error(error.stack);

    // Return a generic error message in case of an unexpected error
    return {
      success: false,
      message: 'An error occurred while fetching the file.',
    };
  }
};

export default uploadFile;
