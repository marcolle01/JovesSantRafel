import getPool from '../../db/getPool.js';

const deletePhotoService = async (photoId) => {
    const pool = await getPool();

    await pool.query('DELETE  FROM photos WHERE id = ?', [photoId]);
};

export default deletePhotoService;
