import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import StartPage from './components/StartPage';
import LogInRegister from './components/LogInRegister';

const Stack = createNativeStackNavigator();

const ToastWrapper = React.forwardRef((props, ref) => (
    <Toast
        ref={ref}
        {...props}
    />
));

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
            <ToastWrapper />
        </NavigationContainer>
    );
};

export default MyStack;
