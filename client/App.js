import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import MyStack from './MyStack';

export default function App() {
    return (
        <AuthProvider>
            <SafeAreaProvider>
                <View style={styles.container}>
                    <StatusBar style='light' />
                    <MyStack />
                </View>
            </SafeAreaProvider>
        </AuthProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 45,
    },
});
