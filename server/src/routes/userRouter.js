import express from 'express';

import authUser from '../middleware/authUser.js';
import userExists from '../middleware/userExists.js';

import {
    registerUserController,
    validateUserController,
    loginUserController,
    deleteUserController,
    getOwnUserProfileController,
    editUserController,
    editUserPasswordController,
    recoverPasswordController,
    sendRecoverPasswordController,
    editUserAvatarController,
} from '../controllers/users/index.js';

const router = express.Router();

router.post('/users/register', registerUserController);

router.get('/users/validate/:registrationCode', validateUserController);

router.post('/users/login', loginUserController);

router.get('/user', authUser, getOwnUserProfileController);

router.put('/user/:userId', authUser, userExists, editUserController);

router.put(
    '/user/password/:userId',
    authUser,
    userExists,
    editUserPasswordController
);

router.patch('/users/password', recoverPasswordController);

router.post('/users/password/recover', sendRecoverPasswordController);

router.delete('/user/:userId', authUser, userExists, deleteUserController);

router.post(
    '/user/avatar/:userId',
    authUser,
    userExists,
    editUserAvatarController
);

export default router;
