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
        ` SELECT 
    e.id AS eventId,
    e.title AS eventTitle,
    e.description AS eventDescription,
    e.eventDate AS eventDate,
    e.price AS eventPrice,
    e.location AS eventLocation,
    e.image AS eventImage, 
    p.photoUrl AS photoUrl,
    p.createdAt AS photoUploadedAt,
    u.username AS username   
FROM 
    events e
LEFT JOIN 
    photos p ON e.id = p.eventId
LEFT JOIN 
    users u ON p.userId = u.id
WHERE 
    e.deletedAt IS NULL
ORDER BY 
    e.eventDate DESC, p.createdAt DESC;
`
    );

    return events;
};

export default selectEventsService;
