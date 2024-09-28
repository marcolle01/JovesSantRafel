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
    registrationCode
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
        registrationCode) 
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
            registrationCode,
        ]
    );
    const emailSubject = `Activa tu cuenta de Asociacion de Jovenes San Rafael`;

    const emailBody = `
    <html>
        <body>
            <table bgcolor="#F8A841" width="670" border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto" > <tbody> <tr> <td> <table bgcolor="#F8A841" width="670" border="0" cellspacing="0" cellpadding="0" align="left" > <tbody> <tr> <td align="left" style=" padding: 20px 40px; color: #fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; " > <p style=" margin: 10px 0 20px; font-size: 35px; font-weight: bold; color: #fff;" > <img src="https://github.com/marcolle01/JovesSantRafel/blob/main/photos/logo.png?raw=true" alt="" style="width: 70px; margin: 0 -3px -7px 0" /> Joves Sant Rafel </p> <p style="margin: 0 0 5px; font-size: 25px; color: #fff;"> Bienvenid@, ${firstName} ${lastName}!!! </p> <p style="margin: 15px 0 5px; font-size: 20px; color: #fff;"> Muchas gracias por registrarte en la Asociación de Jovenes San Rafael. <span style=" display: block; font-size: 18px; margin: 25px 0 0; color: #fff;" > Para continuar, activa tu cuenta haciendo click en el siguiente enlace: </span> </p> <p> <a href="${CLIENT_URL}/users/validate/${registrationCode}" style=" display: inline-block; margin: 0 0 5px; padding: 10px 25px 15px; background-color: #b66b13; font-size: 20px; color: #fff; width: auto; text-decoration: none; font-weight: bold; " >Activa tu cuenta</a > </p> <p style="margin: 50px 0 10px; color: #fff;">&copy; Asociacion de Jovenes San Rafael 2024 </p> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table>
        </body>
    </html>
`;

    await sendMailUtil(email, emailSubject, emailBody);
};

export default insertUserService;
