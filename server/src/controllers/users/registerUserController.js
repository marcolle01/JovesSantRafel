import Randomstring from 'randomstring';
import Joi from 'joi';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertUserService from '../../services/users/insertUserService.js';

const registerUserController = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            username: Joi.string().alphanum().min(3).max(15).required(),
            firstName: Joi.string().min(3).max(10).required(),
            lastName: Joi.string()
                .pattern(/^[a-zA-Z ]+$/)
                .min(3)
                .max(40)
                .required(),
            dni: Joi.string()
                .pattern(
                    /^[0-9]{8}[A-Z]$|^[XYZ][0-9]{7}[A-Z]$|^[KLM][0-9]{7}[A-Z]$/
                )
                .required(),
            password: Joi.string().min(8).max(15).required(),
            phone: Joi.string()
                .pattern(/^[0-9]{9}$/)
                .required(),
            birthdate: Joi.date().required(),
            address: Joi.string().min(3).max(50).required(),
            city: Joi.string().min(3).max(50).required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

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
