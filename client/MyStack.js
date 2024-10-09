import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartPage from './components/StartPage';
import LogInRegister from './components/LogInRegister';

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name='StartPage'
                    component={StartPage}
                />
                <Stack.Screen
                    name='LogInRegister'
                    component={LogInRegister}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;
