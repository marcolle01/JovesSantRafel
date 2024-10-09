import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import StartPage from '../components/StartPage';

const Main = () => {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={[
                styles.container,
                { marginTop: insets.top / 2, paddingBottom: insets.bottom },
            ]}
        >
            <StatusBar style='light' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});

export default Main;
