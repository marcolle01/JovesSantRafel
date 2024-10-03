import selectEventsService from '../../services/events/selectEventsService.js';

const listEventsController = async (req, res, next) => {
    try {
        const { title, description, eventDate, price, location } = req.query;
        const data = await selectEventsService(
            title,
            description,
            eventDate,
            price,
            location
        );
        if (!data.length)
            return res.send({
                status: 'ok',
                message: data,
            });

        res.send({
            status: 'ok',
            data,
        });
    } catch (error) {
        next(error);
    }
};

export default listEventsController;
