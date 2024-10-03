import express from 'express';

import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';

import {
    newEventController,
    listEventsController,
    deleteEventController,
} from '../controllers/events/index.js';

const router = express.Router();

router.post('/events', authUser, isAdmin, newEventController);

router.get('/events', authUser, listEventsController);

router.delete('/event/:eventId', authUser, isAdmin, deleteEventController);

export default router;
