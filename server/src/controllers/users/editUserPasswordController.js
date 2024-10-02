import Joi from 'joi';

import updateEditUserPasswordService from '../../services/users/updateEditUserPasswordService.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const editUserPasswordController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;
        const { userId } = req.params;

        if (loggedId !== userId) {
            generateErrorUtil(
                'Acceso denegado, el token no corresponde al usuario',
                403
            );
        }

        const schema = Joi.object({
            actualPassword: Joi.string().min(8).max(15).required(),
            newPassword: Joi.string().min(8).max(15).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { actualPassword, newPassword } = req.body;

        await updateEditUserPasswordService(
            userId,
            actualPassword,
            newPassword
        );

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserPasswordController;
