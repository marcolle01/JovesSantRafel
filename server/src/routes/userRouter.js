import express from 'express';

import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';
import userExists from '../middleware/userExists.js';

import { registerUserController } from '../controllers/users/index.js';

const router = express.Router();

router.post('/users/register', registerUserController);

export default router;
