import uploadFile, { getData, getDataById } from '../models/upload.model.js';

const uploadController = async (req, res) => {
  try {
    // console.log(req.file);
    const fileUpload = await uploadFile(req.files);

    if (!fileUpload.success) {
      return res.status(400).json({
        success: false,
        message: fileUpload.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: fileUpload.message,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message:
        'An error occurred while processing your uploading file. Please try again later.',
    });
  }
};

export const getDataController = async (req, res) => {
  try {
    const fileFetch = await getData();

    if (!fileFetch.success) {
      return res.status(400).json({
        success: false,
        message: fileFetch.message,
      });
    }

    // console.log(fileFetch);

    return res.status(200).json({
      success: true,
      images: fileFetch,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        'An error occurred while processing your data. Please try again later.',
    });
  }
};

export const getDataByIdController = async (req, res) => {
  try {
    const fileFetch = await getDataById(parseInt(req.params.id));
    if (!fileFetch.success) {
      return res.status(400).json({
        success: false,
        message: fileFetch.message,
      });
    }

    return res.status(200).json({
      success: true,
      image: fileFetch,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        'An error occurred while processing your data. Please try again later.',
    });
  }
};

export default uploadController;
