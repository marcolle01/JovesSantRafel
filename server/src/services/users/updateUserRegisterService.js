import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserRegisterService = async (registrationCode) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `SELECT id FROM users WHERE registrationCode = ?`,
        [registrationCode]
    );
    if (!user.length) {
        generateErrorUtil('Código de registro incorrecto', 401);
    }
    await pool.query(
        `UPDATE users SET active = true, registrationCode = NULL WHERE registrationCode = ?`,
        [registrationCode]
    );
};

export default updateUserRegisterService;
