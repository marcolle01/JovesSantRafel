import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Pressable,
    Text,
    TextInput,
} from 'react-native';

import startPagebg from '../assets/startPagebg.png';
import icon from '../assets/icon.png';

const LogInRegister = ({ navigation }) => {
    const [isLogin, setIsLogin] = useState(true);

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
            <View style={styles.formContainer}>
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
                            placeholderTextColor='black'
                        ></TextInput>
                        <View style={styles.underline} />

                        <TextInput
                            style={styles.input}
                            placeholder='Contraseña'
                            placeholderTextColor='black'
                            secureTextEntry
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
                            onPress={() => navigation.navigate('')}
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
                    <View style={styles.form}>
                        <Text>Registrate en Joves Sant Rafel</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Username'
                        ></TextInput>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            keyboardType='email-address'
                        ></TextInput>
                        <TextInput
                            style={styles.input}
                            placeholder='Contraseña'
                            secureTextEntry
                        ></TextInput>
                        <TextInput
                            style={styles.input}
                            placeholder='Repite la contraseña'
                            secureTextEntry
                        ></TextInput>
                        <Pressable
                            style={[
                                styles.buttonText,
                                { backgroundColor: '#D95507' },
                            ]}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text style={styles.buttonText}>Registrarse</Text>
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
        marginTop: -30,
        backgroundColor: 'lightgray',
        opacity: 0.9,
        borderRadius: 40,
        bottom: -150,
        zIndex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        alignSelf: 'center',
        marginLeft: 10,
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
    },
    form: {
        justifyContent: 'center',
    },
    input: {
        marginTop: 12,
        padding: 10,
        backgroundColor: 'transparent',
        color: 'black',
        fontSize: 16,
    },
    underline: {
        height: 2,
        backgroundColor: 'black',
        marginTop: 2,
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
