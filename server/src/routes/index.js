import express from 'express';

import userRouter from './userRouter.js';
import eventRouter from './eventRouter.js';
import photoRouter from './photoRouter.js';

const router = express.Router();

router.use(userRouter);
router.use(eventRouter);
router.use(photoRouter);

export default router;
