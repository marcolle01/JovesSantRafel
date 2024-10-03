import Joi from 'joi';
import moment from 'moment';
import { saveImageEvent } from '../../utils/eventPhotoUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import insertEventService from '../../services/events/insertEventService.js';

const newEventController = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            title: Joi.string().min(3).max(255).required(),
            description: Joi.string().min(3).max(255).required(),
            price: Joi.alternatives()
                .try(Joi.number(), Joi.string().allow(''))
                .optional(),

            location: Joi.string().min(3).max(255).required(),
            eventDate: Joi.date().iso().required(),
        });

        const validation = schema.validate(req.body);

        if (validation.error) generateErrorUtil(validation.error.message, 400);

        const { title, description, price, location, eventDate } = req.body;

        const priceValue = price === '' ? null : price;

        const formattedEventDate = moment(eventDate).format(
            'YYYY-MM-DD HH:mm:ss'
        );

        const imageName = await saveImageEvent(req.files.image, 640, 480);

        await insertEventService(
            title,
            description,
            priceValue,
            location,
            formattedEventDate,
            imageName
        );

        res.send({
            status: 'ok',
            message: 'Evento creado correctamente',
        });
    } catch (error) {
        next(error);
    }
};
export default newEventController;
