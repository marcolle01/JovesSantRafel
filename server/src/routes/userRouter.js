import express from 'express';

import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';
import userExists from '../middleware/userExists.js';

import {
    registerUserController,
    validateUserController,
} from '../controllers/users/index.js';

const router = express.Router();

router.post('/users/register', registerUserController);
router.get('/users/validate/:registrationCode', validateUserController);

export default router;
