import generateErrorUtil from '../../utils/generateErrorUtil.js';
import deletePhotoService from '../../services/photos/deletePhotoService.js';

const deleteUserPhotoController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;
        const { photoId } = req.params;

        if (!loggedId)
            generateErrorUtil('Debes estar logueado para esta accion', 409);

        await deletePhotoService(photoId);

        res.send({
            status: 'ok',
            message: 'Foto eliminada correctamente',
        });
    } catch (error) {
        next(error);
    }
};
export default deleteUserPhotoController;
