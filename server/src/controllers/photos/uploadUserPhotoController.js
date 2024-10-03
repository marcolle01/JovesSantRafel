import generateErrorUtil from '../../utils/generateErrorUtil.js';
import { uploadUserPhotoUtil } from '../../utils/userPhotoUtil.js';
import insertUserPhotoService from '../../services/photos/insertUserPhotoService.js';

const uploadUserPhotoController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;
        const { eventId } = req.params;

        if (!loggedId)
            generateErrorUtil('Debes estar logueado para esta accion', 409);

        const imageName = await uploadUserPhotoUtil(req.files.image, 640, 480);
        const userId = loggedId;

        await insertUserPhotoService(imageName, userId, eventId);

        res.send({
            status: 'ok',
            message: 'Histoira subida correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default uploadUserPhotoController;
