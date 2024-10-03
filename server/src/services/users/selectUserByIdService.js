import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectUserByIdService = async (userId) => {
    const pool = await getPool();
    const [user] = await pool.query(
        `
        SELECT 
            u.id,
            u.username,
            u.firstname,
            u.lastname,
            u.email,
            u.birthdate,
            u.createdAt,
            p.id AS photoId,
            p.photoUrl,
            p.createdAt AS photoCreatedAt
        FROM 
            users u
        LEFT JOIN 
            photos p ON u.id = p.userId
        WHERE 
            u.id = ?;
    `,
        [userId]
    );

    if (!user.length) generateErrorUtil('No existe este usuario', 404);

    return user[0];
};

export default selectUserByIdService;
