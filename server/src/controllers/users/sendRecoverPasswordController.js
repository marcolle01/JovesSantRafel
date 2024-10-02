import joi from 'joi';
import Randomstring from 'randomstring';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import selectUserByEmailService from '../../services/users/selectUserByEmailService.js';
import updateRecoverPasswordService from '../../services/users/updateRecoverPasswordService.js';

const sendRecoverPasswordController = async (req, res, next) => {
    try {
        const schema = joi.object().keys({
            email: joi.string().email().required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 401);

        const { email } = req.body;

        const user = await selectUserByEmailService(email);

        if (!user)
            return res.send({
                status: 'ok',
                message:
                    'Si existe una cuenta con tu email recibirás un código de recuperación.',
            });
        const recoverPasswordCode = Randomstring.generate(10);

        await updateRecoverPasswordService(email, recoverPasswordCode);

        res.send({
            status: 'ok',
            message:
                'Si existe una cuenta con tu email recibirás un código de recuperación.',
        });
    } catch (error) {
        next(error);
    }
};

export default sendRecoverPasswordController;
