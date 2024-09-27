import Randomstring from 'randomstring';
import Joi from 'joi';

import insertUserService from '../../services/users/insertUserService.js';

const registerUserController = async (req, res, next) => {
    try {
        const registrationcode = Randomstring.generate(30);

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
            registrationcode
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
