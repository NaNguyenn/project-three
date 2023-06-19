import React from "react";
import HomeScreen from "../screens/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LevelScreen from "../screens/levels";
import CategoriesScreen from "../screens/categories";
import LessonScreen from "../screens/lesson";
import DevelopingScreen from "../screens/developing";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Developing" component={DevelopingScreen} />
      <HomeStack.Screen name="Level" component={LevelScreen} />
      <HomeStack.Screen name="Categories" component={CategoriesScreen} />
      <HomeStack.Screen name="Lesson" component={LessonScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
