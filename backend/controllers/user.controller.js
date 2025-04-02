

import user from '../models/user.model.js';

const userController = async (req, res) => {
  try {
    const userData = await user();

    if (!userData.success) {
      return res.status(400).json({
        success: false,
        message: userData.message,
      });
    }



    return res.status(200).json({
      success: true,
      data:userData
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `An error occurred while processing your registration. Please try again later. ${error}`,
    });
  }
};




export default userController;