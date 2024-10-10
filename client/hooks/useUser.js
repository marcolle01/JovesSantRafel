import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../context/AuthContext';

import { fetchProfileUserServices } from '../services/userServices';

import Toast from 'react-native-toast-message';

const useUser = () => {
    const { authToken } = useContext(AuthContext);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await fetchProfileUserServices(authToken);

                setUser(user);
            } catch (err) {
                Toast.show({
                    type: 'error',

                    text2: err.message,
                });
            }
        };

        if (authToken) {
            getUser();
        } else {
            setUser(null);
        }
    }, [authToken]);

    return { user };
};

export default useUser;
