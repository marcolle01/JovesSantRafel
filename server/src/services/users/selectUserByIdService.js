import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectUserByIdService = async (userId) => {
    const pool = await getPool();
    const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [
        userId,
    ]);

    if (!user.length) generateErrorUtil('No existe este usuario', 404);

    return user[0];
};

export default selectUserByIdService;
