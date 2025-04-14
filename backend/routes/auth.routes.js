import express from 'express';
import {
  updateUserController,
  loginController,
  registerController,
} from '../controllers/auth.controller.js';
import homeController from '../controllers/home.controller.js';
import adminController from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middlewares.js';
import adminMiddleware from '../middlewares/admin.middlewares.js';
import upload from '../helper/multer.js';
import { deleteUserController } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', upload.single('profile'), registerController);
router.put('/update/:id', upload.single('profile'), updateUserController);
router.delete(
  '/delete/:id',
  authMiddleware,
  adminMiddleware,
  deleteUserController
);
router.post('/login', loginController);
router.get('/home', authMiddleware, homeController);
router.get('/admin', authMiddleware, adminMiddleware, adminController);

export default router;
