import getPool from '../../db/getPool.js';
import sendMailUtil from '../../utils/sendMailUtil.js';

const updateRecoverPasswordService = async (email, recoverPasswordCode) => {
    const pool = await getPool();

    await pool.query(
        `UPDATE users SET recoverPasswordCode = ? WHERE email = ?`,
        [recoverPasswordCode, email]
    );

    const subject = 'Recuperación de contraseña';

    const body = `
    <html>
        <body>
            <table bgcolor="#3c3c3c" width="670" border="0" cellspacing="0" cellpadding="0" align="left" > <tbody> <tr> <td align="left" style=" padding: 20px 40px; color: #fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; " > <p style=" margin: 10px 0 20px; font-size: 35px; font-weight: bold; color: #fff;" > <img src="https://raw.githubusercontent.com/mander92/ClockYou/main/docs/logo-email.png" alt="Logo" style="width: 40px; margin: 0 -3px -10px 0" /> ClockYou </p> <p style="margin: 0 0 5px; font-size: 16px; color: #fff;"> Se ha solicitado la recuperación de la contraseña para el siguiente email </p> <p style="margin: 0 0 15px; font-size: 20px; color: #fff"> ${email} </p> <p style="margin: 35px 0 5px; font-size: 16px; color: #fff;"> Utilice el siguiente código de recuperación para crear una nueva contraseña: </p> <p style="margin: 0 0 15px; font-size: 20px; color: #fff"> ${recoverPasswordCode} </p> <p style="margin: 70px 0 2px; color: #fff;"> Gracias por confiar en ClockYou. </p> <p style="margin: 0 0 10px; color: #fff;">&copy; ClockYou 2024</p> </td> </tr> </tbody> </table>
        </body>
    </html>
	`;
    await sendMailUtil(email, subject, body);
};

export default updateRecoverPasswordService;
