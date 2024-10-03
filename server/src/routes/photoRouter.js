import express from 'express';

import authUser from '../middleware/authUser.js';
import userExists from '../middleware/userExists.js';
import { uploadUserPhotoController } from '../controllers/photos/index.js';

const router = express.Router();

router.post(
    '/:eventId/photos',
    authUser,    
    uploadUserPhotoController
);

router.delete('/photos', authUser);

export default router;
