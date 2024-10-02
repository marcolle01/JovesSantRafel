import updateDeleteUserService from '../../services/users/updateDeleteUserService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const deleteUserController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;
        const { userId } = req.params;

        if (loggedId !== userId)
            generateErrorUtil('Acceso denegado, el token no coincide', 409);

        await updateDeleteUserService(userId);

        res.send({
            status: 'ok',
            message: `Usuario  eliminado con exito.`,
        });
    } catch (error) {
        next(error);
    }
};

export default deleteUserController;
