import Randomstring from 'randomstring';
import Joi from 'joi';

import insertUserService from '../../services/users/insertUserService.js';

const registerUserController = async (req, res, next) => {
    try {
        const {
            email,
            username,
            firstName,
            lastName,
            dni,
            password,
            phone,
            birthdate,
            address,
            city,
        } = req.body;

        const registrationCode = Randomstring.generate(30);

        await insertUserService(
            email,
            username,
            firstName,
            lastName,
            dni,
            password,
            phone,
            birthdate,
            address,
            city,
            registrationCode
        );
        res.send({
            status: 'ok',
            message:
                'Usuario registrado correctamente. Revise su correo para activar su cuenta.',
        });
    } catch (error) {
        next(error);
    }
};

export default registerUserController;
