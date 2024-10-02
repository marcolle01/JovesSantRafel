import Joi from 'joi';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import updateUserService from '../../services/users/updateUserService.js';

const editUserController = async (req, res, next) => {
    try {
        const loggedId = req.userLogged.id;
        const { userId } = req.params;

        if (loggedId !== userId) {
            generateErrorUtil(
                'Acceso denegado, el token no corresponde al usuario',
                403
            );
        }

        const schema = Joi.object().keys({
            firstName: Joi.string().min(3).max(10).required(),
            lastName: Joi.string()
                .pattern(/^[a-zA-Z ]+$/)
                .min(3)
                .max(40)
                .required(),
            phone: Joi.string()
                .pattern(/^[0-9]{9}$/)
                .required(),
            birthdate: Joi.date().required(),
            address: Joi.string().min(3).max(50).required(),
            city: Joi.string().min(3).max(50).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { firstName, lastName, phone, birthdate, address, city } =
            req.body;

        await updateUserService(
            userId,
            firstName,
            lastName,
            phone,
            birthdate,
            address,
            city
        );

        res.send({
            status: 'ok',
            message: 'Usuario actualizado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserController;
