import getPool from '../../db/getPool.js';
import { v4 as uuid } from 'uuid';

const insertUserPhotoService = async (imageName, userId, eventId) => {
    const pool = await getPool();

    const id = uuid();

    await pool.query(
        'INSERT INTO photos (id, photoURL, userId, eventId, createdAt) VALUES (?, ?, ?, ?, NOW())',
        [id, imageName, userId, eventId]
    );
};

export default insertUserPhotoService;
