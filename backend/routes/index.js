import express from 'express';

import registerRouter from './auth.routes.js';
import userRoute from './user.routes.js';

const router = express.Router();

router.use('/api/auth', registerRouter);
router.use('/api/', userRoute);

export default router;
