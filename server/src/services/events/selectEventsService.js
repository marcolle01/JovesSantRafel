import getPool from '../../db/getPool.js';

const selectEventsService = async (
    title,
    description,
    eventDate,
    price,
    location
) => {
    const pool = await getPool();
    const [events] = await pool.query(
        `SELECT 
            e.id AS eventId,
            e.title AS eventTitle,
            e.description AS eventDescription,
            e.eventDate AS eventDate,
            e.price AS eventPrice,
            e.location AS eventLocation,
            e.image AS eventImage,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'photoUrl', p.photoUrl, 
                        'photoUploadedAt', p.createdAt,
                        'photoUploaderUsername', pu.username
                    )
                )
                FROM photos p
                LEFT JOIN users pu ON p.userId = pu.id
                WHERE p.eventId = e.id
            ) AS photos,
            u.username AS eventCreatorUsername
        FROM 
            events e
        LEFT JOIN 
            users u ON e.createdBy = u.id
        WHERE 
            e.deletedAt IS NULL
        ORDER BY 
            e.eventDate DESC;
        `
    );

    return events;
};

export default selectEventsService;
