import express from 'express';

import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';

import { newEventController } from '../controllers/events/index.js';

const router = express.Router();

router.post('/events', authUser, isAdmin, newEventController);

export default router;
