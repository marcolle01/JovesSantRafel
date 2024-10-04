import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import StartPage from './components/StartPage';

export default function App() {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <StatusBar style='light' />
                <StartPage />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',

        justifyContent: 'center',
    },
});
