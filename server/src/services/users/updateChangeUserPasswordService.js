import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
import bcrypt from 'bcrypt';

const updateChangeUserPasswordService = async (
    recoverPasswordCode,
    newPassword
) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
        SELECT id, recoverPasswordCode FROM users WHERE recoverPasswordCode = ?
        `,
        [recoverPasswordCode]
    );

    if (!user.length || user[0].recoverPasswordCode !== recoverPasswordCode) {
        generateErrorUtil(
            'Código de recuperación de contraseña no válido.',
            401
        );

        const hashPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            'UPDATE users SET password = ?, recoverPasswordCode = NULL WHERE id = ?',
            [hashPassword, user[0].id]
        );
    }
};

export default updateChangeUserPasswordService;
