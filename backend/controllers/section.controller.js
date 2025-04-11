import section from "../models/section.model.js";

const sectionController = async (req, res) => {
    try {
      const sectionData = await section();
  
      if (!sectionData.success) {
        return res.status(400).json({
          success: false,
          message: sectionData.message,
        });
      }
  
  
  
      return res.status(200).json({
        success: true,
        data:sectionData
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: `An error occurred while processing your data. Please try again later. ${error}`,
      });
    }
  };

  export default sectionController;