import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const deleteEventService = async (eventId) => {
    const pool = await getPool();
    const [event] = await pool.query(
        'SELECT * FROM events WHERE  deletedAt IS NULL AND id = ?;',
        [eventId]
    );

    if (!event.length) generateErrorUtil('Evento no encontrado', 404);

    await pool.query(`UPDATE events SET deletedAt = NOW() WHERE id = ?;`, [
        eventId,
    ]);
};

export default deleteEventService;
