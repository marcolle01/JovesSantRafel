import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import getPool from './getPool.js';

import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../env.js';

const initDb = async () => {
    try {
        const pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            `
            DROP TABLE IF EXISTS  photos, events, users
            `
        );

        console.log('Creando tablas...');

        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS users (
                id CHAR(36) PRIMARY KEY NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(20) UNIQUE,
                firstName VARCHAR(25),
                lastName VARCHAR(50),
                dni CHAR(11) UNIQUE,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(15) UNIQUE,
                birthdate DATE,
                address VARCHAR(100),
                city VARCHAR(25),
                role ENUM('admin', 'client') DEFAULT 'client',
                avatar CHAR(40),
                active BOOLEAN DEFAULT false,
                registrationCode CHAR(30),
                recoverPasswordCode CHAR(10),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt TIMESTAMP )
            `
        );

        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS events (
                id CHAR(36) PRIMARY KEY NOT NULL,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                eventDate DATETIME NOT NULL,
                price DECIMAL(5,2) NOT NULL,
                location VARCHAR(30) NOT NULL,
                image CHAR(40),
                createdBy CHAR(36) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt TIMESTAMP,
                FOREIGN KEY (createdBy) REFERENCES users(id) )
                
            `
        );

        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS photos(
                id CHAR(36) PRIMARY KEY NOT NULL,
                photoUrl VARCHAR(255),
                eventId CHAR(36) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt TIMESTAMP,
                FOREIGN KEY (eventId) REFERENCES events(id))
               
            `
        );

        // const insertTypeOfService = async (
        //     id,
        //     type,
        //     description,
        //     city,
        //     price
        // ) => {
        //     await pool.query(
        //         `
        //         INSERT INTO typeOfServices (id, type, description, city, price) VALUES (?, ?, ?, ?, ?)
        //         `,
        //         [id, type, description, city, price]
        //     );
        // };

        // await insertTypeOfService(
        //     uuid(),
        //     'Clases Particulares',
        //     'Profesores especializados para reforzar conocimientos en distintas materias.',
        //     'Coruña',
        //     '20'
        // );

        const hashedPass = await bcrypt.hash(ADMIN_PASSWORD, 10);

        await pool.query(
            `
            INSERT INTO users (id, email, password, role, active) VALUES (?, ?, ?, ?, ?)
            `,
            [uuid(), ADMIN_EMAIL, hashedPass, 'admin', 1]
        );

        console.log('¡Tablas creadas!');

        console.log('¡Servicios básicos creados!');

        console.log('¡ADMIN creado!');
    } catch (err) {
        console.error('Error creando las tablas', err.message, err);
    } finally {
        process.exit();
    }
};

initDb();
