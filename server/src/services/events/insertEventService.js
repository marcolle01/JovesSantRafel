import { v4 as uuid } from 'uuid';
import getPool from '../../db/getPool.js';

const insertEventService = async (
    title,
    description,
    price,
    location,
    eventDate,
    imageName
) => {
    const pool = await getPool();

    const id = uuid();

    await pool.query(
        'INSERT INTO events (id, title, description, price, location, eventDate, image) VALUES (?,?,?,?,?,?,?)',
        [id, title, description, price, location, eventDate, imageName]
    );
};

export default insertEventService;
