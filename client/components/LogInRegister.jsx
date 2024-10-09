import React from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Pressable,
    Text,
} from 'react-native';

import startPagebg from '../assets/startPagebg.png';

const LogInRegister = ({ navigation }) => {
    return <View style={[styles.container]}></View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D77418',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LogInRegister;
