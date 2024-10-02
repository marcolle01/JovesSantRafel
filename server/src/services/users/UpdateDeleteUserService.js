import getPool from '../../db/getPool.js';

const updateDeleteUserService = async (userId) => {
    const pool = await getPool();
    const [email] = await pool.query(
        `SELECT email, username, dni, phone FROM users WHERE id = ?`,
        [userId]
    );

    const deletedEmail = '*' + email[0].email + '*';
    const deletedUsername = '*' + email[0].username + '*';
    const deletedPhone = '*' + email[0].phone + '*';
    const deletedDni = '*' + email[0].dni + '*';

    await pool.query(
        `UPDATE users SET active = 0, deletedAt = CURRENT_TIMESTAMP, email = ?, username = ?, phone = ?, dni = ? WHERE id = ?`,
        [deletedEmail, deletedUsername, deletedPhone, deletedDni, userId]
    );
};

export default updateDeleteUserService;
