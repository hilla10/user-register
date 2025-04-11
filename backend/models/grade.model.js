// Import the query function to execute SQL queries
import query from '../database/db.js';

const grade = async () => {
  try {
    
    // select the user from the database
    const q = `SELECT 
    grades.grade_id, 
    grades.grade, 
    users.first_name, 
    users.last_name, 
    sections.section_name
FROM 
    grades
INNER JOIN 
    users ON grades.student_id = users.user_id
INNER JOIN 
    sections ON grades.section_id = sections.section_id
WHERE 
    users.role = 'student';
;
`;

    const grade = await query(q);

    if(!grade) {
      const message = {
        success: false,
        message: 'grade not found.',
      };
      return message;
    }

    // If insertion is successful, return a success message
    const message = {
      success: true,
      message:grade,
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


export const addGradeModel = async (formData) => {
    try {
      const { grade, student_id, section_id } = formData;

        const q = `INSERT INTO grades (grade, student_id, section_id) VALUES (?, ?, ?)`;
      const values = [grade, student_id, section_id];
        const result = await query(q, values);
  
      // Validate the input data
      if (!result) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields.',
        });
      }
  
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: `An error occurred while adding the grade. Please try again later. ${error}`,
      });
    }
  }

// Export the register function for use in other modules
export default grade;
