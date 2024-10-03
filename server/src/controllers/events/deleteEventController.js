import deleteEventService from '../../services/events/deleteEventService.js';

const deleteEventController = async (req, res, next) => {
    try {
        const { eventId } = req.params;

        await deleteEventService(eventId);

        res.send({
            status: 'ok',
            message: 'Evento eliminado correctamnte!',
        });
    } catch (error) {
        next(error);
    }
};

export default deleteEventController;
