import express from 'express';

import authUser from '../middleware/authUser.js';

import {
    uploadUserPhotoController,
    deleteUserPhotoController,
} from '../controllers/photos/index.js';

const router = express.Router();

router.post('/:eventId/photos', authUser, uploadUserPhotoController);

router.delete('/events/:photoId', authUser, deleteUserPhotoController);

export default router;
