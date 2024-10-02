import getPool from '../../db/getPool.js';

const updateUserService = async (
    userId,
    firstName,
    lastName,
    phone,
    birthdate,
    address,
    city
) => {
    const pool = await getPool();

    await pool.query(
        'UPDATE users SET firstname=?, lastname=?, phone = ?, birthdate=?, address=?, city=? WHERE id=?',
        [firstName, lastName, phone, birthdate, address, city, userId]
    );
};

export default updateUserService;
