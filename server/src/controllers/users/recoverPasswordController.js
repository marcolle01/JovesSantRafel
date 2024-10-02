import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateChangeUserPasswordService from '../../services/users/updateChangeUserPasswordService.js';

const recoverPasswordController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            recoverPasswordCode: Joi.string().length(10).required(),
            newPassword: Joi.string().min(8).max(15).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { recoverPasswordCode, newPassword } = req.body;

        await updateChangeUserPasswordService(recoverPasswordCode, newPassword);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente.',
        });
    } catch (error) {
        next(error);
    }
};

export default recoverPasswordController;
