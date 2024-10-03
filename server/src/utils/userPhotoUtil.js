import fs from 'fs/promises';
import path from 'path';
import { UPLOADS_DIR, HISTORIES_DIR } from '../../env.js';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import generateErrorUtil from './generateErrorUtil.js';

const userUploadDir = path.join(
    process.cwd(),
    `/${UPLOADS_DIR}/${HISTORIES_DIR}`
);

export const uploadUserPhotoUtil = async (img, width, height) => {
    try {
        const uploadsDir = path.join(process.cwd(), `/${HISTORIES_DIR}`);
        try {
            await fs.access(uploadsDir);
        } catch (error) {
            await fs.mkdir(uploadsDir, { recursive: true });
        }

        try {
            await fs.access(userUploadDir);
        } catch (error) {
            await fs.mkdir(userUploadDir, { recursive: true });
        }

        const sharpImg = sharp(img.data);

        sharpImg.resize({ width, height });

        const imgName = `${uuidv4()}.jpg`;

        const pathImg = path.join(userUploadDir, imgName);

        await sharpImg.toFile(pathImg);

        return imgName;
    } catch (error) {
        generateErrorUtil('Error al guardar avatar', 500);
    }
};

export const deleteAvatarUtil = async (imgName) => {
    try {
        const imagePath = path.join(userUploadDir, imgName);

        try {
            await fs.access(imagePath);
        } catch (error) {
            return;
        }

        await fs.unlink(imagePath);
    } catch (error) {
        generateErrorUtil('Error al eliminar avatar', 500);
    }
};
