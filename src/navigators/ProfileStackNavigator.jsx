import React from 'react'
import ProfileScreen from '../screens/profile';
import SignInScreen from '../screens/auth/SignIn';
import SignUpScreen from '../screens/auth/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <ProfileStack.Navigator initialRouteName="Profile">
            <ProfileStack.Screen name="Profile" component={ProfileScreen} />
            <ProfileStack.Screen name="SignIn" component={SignInScreen} />
            <ProfileStack.Screen name="SignUp" component={SignUpScreen} />
        </ProfileStack.Navigator>
    )
}

export default ProfileStackNavigator