import jwt from 'jsonwebtoken';
import login from '../models/login.model.js';
import register from '../models/register.model.js';
import updateUser from '../models/updateUser.model.js';

const registerController = async (req, res) => {
  try {
    const userRegister = await register(req.body, req.file);
    if (!userRegister.success) {
      return res.status(400).json({
        success: false,
        message: userRegister.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: userRegister.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `An error occurred while processing your registration. Please try again later. ${error}`,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.body, req.file, req.params);

    if (!updatedUser.success) {
      return res.status(400).json({
        success: false,
        message: updatedUser.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: updatedUser.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `An error occurred while processing your registration. Please try again later. ${error}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    // Call the login function to validate user credentials
    const userLoggedIn = await login(req.body);

    // If login is unsuccessful, return a 401 Unauthorized error
    if (!userLoggedIn.success) {
      return res.status(401).json({
        success: false,
        message: userLoggedIn.message, // Message from login service
      });
    }

    // Destructure necessary data from the user data returned from the login service
    const { id, username, email, role } = userLoggedIn.data[0];

    // Create a JWT access token with expiration time of 30 minutes
    const accessToken = jwt.sign(
      {
        userId: id,
        username: username,
        email: email,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30m' } // Token expiration time
    );

    // Return a success response with the access token
    return res.status(200).json({
      success: true,
      message: 'Your are logged in successfully.',
      token: { userToken: accessToken },
    });
  } catch (error) {
    // Log the error and return a 500 error if something goes wrong
    console.error('Error during login:', error.message);
    return res.status(500).json({
      success: false,
      message:
        'An error occurred while processing your login. Please try again later.',
    });
  }
};

export default loginController;

export { registerController, loginController, updateUserController };
