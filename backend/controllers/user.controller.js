import user, { deleteUser, getUser } from '../models/user.model.js';

const userController = async (req, res) => {
  try {
    const data = await user();

    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: data.message,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `An error occurred while processing your data. Please try again later. ${error}`,
    });
  }
};

export const getUserController = async (req, res) => {
  try {
    const user = await getUser(req.params);
    if (!user.success) {
      return res.status(400).json({
        success: false,
        message: user.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `An error occurred while processing your data. Please try again later. ${error}`,
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const user = await deleteUser(req.params);
    if (!user.success) {
      return res.status(400).json({
        success: false,
        message: user.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: user.message,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `An error occurred while deleting user. Please try again later. ${error}`,
    });
  }
};

export default userController;
