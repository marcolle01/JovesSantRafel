import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Pressable,
    Text,
    Button,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import startPagebg from '../assets/startPagebg.png';
import icon from '../assets/icon.png';

const StartPage = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
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
                    style={styles.pressable}
                    onPress={() => console.log('Iniciar Sesión')}
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
