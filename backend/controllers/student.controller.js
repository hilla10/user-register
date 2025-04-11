import student from "../models/student.model.js";

const studentController = async (req, res) => {
    try {
      const studentData = await student();
  
      if (!studentData.success) {
        return res.status(400).json({
          success: false,
          message: studentData.message,
        });
      }
  
  
  
      return res.status(200).json({
        success: true,
        data:studentData
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: `An error occurred while processing your registration. Please try again later. ${error}`,
      });
    }
  };

  export default studentController;