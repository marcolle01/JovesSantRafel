import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import { CLIENT_URL } from '../../../env.js';

const insertUserService = async (
    email,
    username,
    firstName,
    lastName,
    dni,
    password,
    phone,
    birthdate,
    address,
    city,
    registrationcode
) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `SELECT id FROM users WHERE email = ? OR username = ?`,
        [email, username]
    );

    if (user.length) {
        throw generateErrorUtil('Usuario ya registrado', 409);
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    await pool.query(
        `INSERT INTO users (id, email,
        username,
        firstName,
        lastName,
        dni,
        password,
        phone,
        birthdate,
        address,
        city,
        registrationcode) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            uuid(),
            email,
            username,
            firstName,
            lastName,
            dni,
            passwordHashed,
            phone,
            birthdate,
            address,
            city,
            registrationcode,
        ]
    );
};

export default insertUserService;
