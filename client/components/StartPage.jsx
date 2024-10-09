import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Pressable,
    Text,
} from 'react-native';

import startPagebg from '../assets/startPagebg.png';
import icon from '../assets/icon.png';

const StartPage = ({ navigation }) => {
    return (
        <View style={[styles.container]}>
            <ImageBackground
                source={startPagebg}
                style={styles.image}
            >
                <View>
                    <Image
                        source={icon}
                        style={styles.icon}
                    />
                </View>
                <Pressable
                    onPress={() => navigation.navigate('LogInRegister')}
                    style={styles.pressable}
                >
                    <Text>Iniciar Sesión</Text>
                </Pressable>
                <Text style={styles.text}>
                    ¿No tienes una cuenta?{' '}
                    <Pressable>
                        <Text style={styles.textButton}>Registrate</Text>
                    </Pressable>
                </Text>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        width: 250,
        height: 250,
        marginTop: -300,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 20,
        padding: 10,
    },
    pressable: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 120,
        bottom: 150,
    },

    text: {
        position: 'absolute',
        bottom: 100,
        color: '#FFFFFF',
    },
    textButton: {
        bottom: -2,
        color: '#FFFFFF',
        textDecorationLine: 'underline',
    },
});

export default StartPage;
