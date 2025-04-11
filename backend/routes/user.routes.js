import express from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middlewares.js';
import adminMiddleware from '../middlewares/admin.middlewares.js';

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, userController);

export default router;
