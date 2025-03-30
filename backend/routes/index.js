import express from 'express';

import registerRouter from './auth.routes.js';
import uploadRouter from './upload.routes.js';

const router = express.Router();

router.use('/api/auth', registerRouter);
router.use('/api/', uploadRouter);

export default router;
