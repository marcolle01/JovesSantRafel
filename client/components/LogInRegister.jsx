import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Pressable,
    Text,
    TextInput,
    Keyboard,
} from 'react-native';
import Toast from 'react-native-toast-message';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import startPagebg from '../assets/startPagebg.png';
import icon from '../assets/icon.png';

import { AuthContext } from '../context/AuthContext';
import useUser from '../hooks/useUser';

import { fetchLoginUserServices } from '../services/userServices';

const LogInRegister = ({ navigation }) => {
    const { authLogin } = useContext(AuthContext);
    const { user } = useUser();

    const [isLogin, setIsLogin] = useState(true);
    const [keyboardStatus, setKeyboardStatus] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // const handleConfirm = (selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setDate(currentDate.toLocaleDateString());
    //     hideDatePicker();
    // };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardStatus(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardStatus(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const authToken = await fetchLoginUserServices(email, password);
            console.log('Auth Token:', authToken);

            authLogin(authToken.data);
            Toast.show({ type: 'success', text1: 'Iniciando sesión' });

            navigation.navigate('StartPage');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.message,
            });
        }
    };

    return (
        <View style={[styles.container]}>
            <Image
                source={startPagebg}
                style={styles.image}
            />
            <View style={[styles.iconContainer]}>
                <Image
                    source={icon}
                    style={styles.icon}
                />
            </View>

            <View
                style={
                    keyboardStatus
                        ? styles.formContainerKeyboardIsOpened
                        : styles.formContainer
                }
            >
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, isLogin && styles.activeButton]}
                        onPress={() => setIsLogin(true)}
                    >
                        <Text style={styles.buttonText}>Iniciar Sesion</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, !isLogin && styles.activeButton]}
                        onPress={() => setIsLogin(false)}
                    >
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </Pressable>
                </View>

                {isLogin ? (
                    <View style={styles.form}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 30,
                                textAlign: 'center',
                            }}
                        >
                            Bienvenido a {'\n'}Joves Sant Rafel
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            keyboardType='email-address'
                            placeholderTextColor='white'
                            value={email}
                            onChange={(e) => setEmail(e.nativeEvent.text)}
                        ></TextInput>
                        <View style={styles.underline} />

                        <TextInput
                            style={styles.input}
                            placeholder='Contraseña'
                            placeholderTextColor='white'
                            secureTextEntry
                            value={password}
                            onChange={(e) => setPassword(e.nativeEvent.text)}
                        ></TextInput>
                        <View style={styles.underline} />

                        <Pressable
                            style={[
                                styles.buttonText,
                                {
                                    backgroundColor: '#D95507',
                                    borderRadius: 40,
                                    marginTop: 10,
                                    height: 55,
                                },
                            ]}
                            onPress={handleLogin}
                        >
                            <Text
                                style={[styles.buttonText, { marginTop: 18 }]}
                            >
                                Iniciar Sesión
                            </Text>
                        </Pressable>

                        <Text style={styles.textButton}>
                            ¿Has olvidado tu contraseña?
                        </Text>
                    </View>
                ) : (
                    <View
                        style={
                            keyboardStatus
                                ? styles.registerFormContainerKeyboardIsOpened
                                : styles.registerFormContainer
                        }
                    >
                        <View style={styles.form}>
                            <TextInput
                                style={styles.inputRegister}
                                placeholder='Email'
                                keyboardType='email-address'
                                placeholderTextColor='white'
                            ></TextInput>
                            <View style={styles.underline} />
                            <TextInput
                                style={styles.inputRegister}
                                placeholder='Nombre de usuario'
                                placeholderTextColor='white'
                            ></TextInput>
                            <View style={styles.underline} />
                            <TextInput
                                style={styles.inputRegister}
                                placeholder='Nombre'
                                placeholderTextColor='white'
                            ></TextInput>
                            <View style={styles.underline} />
                            <TextInput
                                style={styles.inputRegister}
                                placeholder='Apellidos'
                                placeholderTextColor='white'
                            ></TextInput>
                            <View style={styles.underline} />
                            <TextInput
                                style={styles.inputRegister}
                                placeholder='Contraseña'
                                secureTextEntry
                                placeholderTextColor='white'
                            ></TextInput>
                            <View style={styles.underline} />

                            <TextInput
                                style={styles.input}
                                placeholder='Data de nacimiento'
                                onFocus={showDatePicker}
                                placeholderTextColor='white'
                            />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode='date'
                                // onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />

                            <View style={styles.underline} />
                        </View>
                        <Pressable
                            style={[
                                styles.buttonText,
                                {
                                    backgroundColor: '#D95507',
                                    borderRadius: 40,
                                    marginTop: 10,
                                    height: 55,
                                },
                            ]}
                            onPress={() => navigation.navigate('')}
                        >
                            <Text
                                style={[styles.buttonText, { marginTop: 18 }]}
                            >
                                Registrarse
                            </Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D77418',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 250,
        height: 250,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 20,
    },
    iconContainer: {
        position: 'absolute',
        top: 50,
        alignItems: 'center',
        width: '100%',
    },
    image: {
        position: 'absolute',
        top: '-50%',
        borderRadius: 50,
    },
    formContainer: {
        width: '90%',
        height: '50%',
        padding: 20,
        marginTop: '500',
        backgroundColor: 'lightgray',
        opacity: 0.9,
        borderRadius: 40,
        bottom: -150,
        zIndex: 1,
    },

    formContainerKeyboardIsOpened: {
        width: '90%',
        height: '50%',
        padding: 20,
        marginTop: '500',
        backgroundColor: 'lightgray',
        opacity: 0.9,
        borderRadius: 40,
        bottom: 150,
        zIndex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        alignSelf: 'center',
        marginLeft: 10,
    },

    registerButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginLeft: 10,
        borderRadius: 40,
    },
    inputRegister: {
        padding: 10,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 16,
    },
    button: {
        height: 55,
        padding: 10,
        backgroundColor: '#888',
        borderRadius: 40,
        width: '58%',
    },
    activeButton: {
        backgroundColor: '#D95507',
        zIndex: 1,
    },

    buttonText: {
        textAlign: 'center',
        marginTop: 10,
        borderRadius: 40,
        color: 'white',
    },
    form: {
        justifyContent: 'center',
    },
    input: {
        marginTop: 0,
        padding: 10,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 16,
    },
    underline: {
        height: 2,
        backgroundColor: 'white',
        marginTop: -3,
    },

    textButton: {
        paddingTop: 15,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LogInRegister;
