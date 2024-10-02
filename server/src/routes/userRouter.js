import express from 'express';

import authUser from '../middleware/authUser.js';
import isAdmin from '../middleware/isAdmin.js';
import userExists from '../middleware/userExists.js';

import {
    registerUserController,
    validateUserController,
    getUserController,
    loginUserController,
    deleteUserController,
    getOwnUserProfileController,
    editUserController,
    editUserPasswordController,
} from '../controllers/users/index.js';

const router = express.Router();

router.post('/users/register', registerUserController);

router.get('/users/validate/:registrationCode', validateUserController);

router.post('/users/login', loginUserController);

router.get('/user', authUser, getOwnUserProfileController);

router.get(
    '/user/admin/:userId',
    authUser,
    isAdmin,
    userExists,
    getUserController
);

router.put('/user/:userId', authUser, userExists, editUserController);

router.put(
    '/user/password/:userId',
    authUser,
    userExists,
    editUserPasswordController
);

router.delete('/user/:userId', authUser, userExists, deleteUserController);

export default router;
