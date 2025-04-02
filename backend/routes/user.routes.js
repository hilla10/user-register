import express from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middlewares.js';
import adminMiddleware, { teacherMiddleware } from '../middlewares/admin.middlewares.js';
import gradeController from '../controllers/grade.controller.js';
import studentController from '../controllers/student.controller.js';
import sectionController from '../controllers/section.controller.js';

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, userController);
router.get('/grades', authMiddleware, teacherMiddleware, gradeController);
router.post('/grades', authMiddleware, teacherMiddleware, gradeController);
router.get('/students', authMiddleware, teacherMiddleware, studentController);
router.get('/sections', authMiddleware, teacherMiddleware, sectionController);

export default router;
