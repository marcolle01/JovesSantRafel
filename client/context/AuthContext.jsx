import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if (token) {
                    setAuthToken(token);
                }
            } catch (error) {
                console.error('Failed to load auth token', error);
            }
        };

        loadToken();
    }, []);

    const authLogin = async (newToken) => {
        try {
            await AsyncStorage.setItem('authToken', newToken);
            setAuthToken(newToken);
        } catch (error) {
            console.error('Failed to save auth token', error);
        }
    };

    const authLogout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            setAuthToken(null);
        } catch (error) {
            console.error('Failed to remove auth token', error);
        }
    };

    return (
        <AuthContext.Provider value={{ authToken, authLogin, authLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
