import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeStackNavigator from "./HomeStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Trang Chủ") {
            iconName = focused ? "md-home" : "md-home-outline";
          } else if (route.name === "Hồ Sơ") {
            iconName = focused ? "md-person" : "md-person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Trang Chủ" component={HomeStackNavigator} />
      <Tab.Screen name="Hồ Sơ" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
