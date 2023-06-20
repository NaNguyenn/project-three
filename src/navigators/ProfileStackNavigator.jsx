import React from "react";
import ProfileScreen from "../screens/profile";
import SignInScreen from "../screens/auth/SignIn";
import SignUpScreen from "../screens/auth/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminScreen from "../screens/admin";

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="SignIn" component={SignInScreen} />
      <ProfileStack.Screen name="SignUp" component={SignUpScreen} />
      <ProfileStack.Screen name="Admin" component={AdminScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
