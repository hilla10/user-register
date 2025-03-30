import express from 'express';
import {
  registerController,
  loginController,
} from '../controllers/auth.controller.js';
import homeController from '../controllers/home.controller.js';
import adminController from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middlewares.js';
import adminMiddleware from '../middlewares/admin.middlewares.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/home', authMiddleware, homeController);
router.get('/admin', authMiddleware, adminMiddleware, adminController);

export default router;
