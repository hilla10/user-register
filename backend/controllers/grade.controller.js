

import grade, { addGradeModel } from '../models/grade.model.js';

const gradeController = async (req, res) => {
  try {
    const gradeData = await grade();

    if (!gradeData.success) {
      return res.status(400).json({
        success: false,
        message: gradeData.message,
      });
    }



    return res.status(200).json({
      success: true,
      data:gradeData
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `An error occurred while processing your registration. Please try again later. ${error}`,
    });
  }
};

export const addGradeController = async (req, res) => {
    // Call the model function to add a grade
    const result = await addGradeModel(req.body);
  
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Grade added successfully.',
    });
}



export default gradeController;