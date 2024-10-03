import generateErrorUtil from '../../utils/generateErrorUtil.js';
import {
    deleteAvatarUtil,
    saveAvatarUtil,
} from '../../utils/avatarPhotoUtil.js';
import updateUserAvatarService from '../../services/users/updateUserAvatarService.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';

const editUserAvatarController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;

        const { userId } = req.params;

        if (loggedId !== userId)
            generateErrorUtil('Acceso denegado, el token no coincide', 409);

        const user = await selectUserByIdService(userId);

        if (user.avatar) await deleteAvatarUtil(user.avatar);

        if (!req.files || !req.files.avatar) {
            throw generateErrorUtil('No se ha subido ningún archivo', 400);
        }

        const avatarName = await saveAvatarUtil(req.files.avatar, 320, 240);

        await updateUserAvatarService(avatarName, userId);

        res.send({
            status: 'ok',
            message: 'Avatar actualizado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserAvatarController;
