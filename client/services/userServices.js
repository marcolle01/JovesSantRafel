import { VITE_API_URL } from '../config.js';

export const fetchProfileUserServices = async (authToken) => {
    const res = await fetch(`${VITE_API_URL}/user`, {
        headers: {
            Authorization: authToken,
        },
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body.data;
};

export const fetchLoginUserServices = async (email, password) => {
    const res = await fetch(`${VITE_API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const body = await res.json();

    if (body.status === 'error') {
        throw new Error(body.message);
    }

    return body;
};
