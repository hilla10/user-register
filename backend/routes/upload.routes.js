import express from 'express';
import uploadController, {
  getDataByIdController,
  getDataController,
} from '../controllers/upload.controller.js';
import upload, { errorHandler } from '../helper/multer.js';
const router = express.Router();
import authMiddleware from '../middlewares/auth.middlewares.js';
import adminMiddleware from '../middlewares/admin.middlewares.js';

router.post(
  '/upload',
  upload.single('file'),
  errorHandler,
  authMiddleware,
  adminMiddleware,
  uploadController
);

// router.post(
//   '/upload',
//   upload.single('file'),
//   authMiddleware,
//   adminMiddleware,
//   uploadController,
//   errorHandler
// );

router.get('/upload', getDataController);
router.get('/upload/:id', getDataByIdController);

export default router;
