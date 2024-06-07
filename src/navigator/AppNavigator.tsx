import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen";
import FriendsNavigator from "./FriendsNavigator";

const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  Home: undefined;
  Friends: undefined;
};

const AppNavigator: React.FC = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { paddingBottom: 0, backgroundColor: "#fffff" },
          tabBarLabelStyle: { color: "black" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Icon
                name="home"
                color={focused ? "black" : "grey"}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Friends"
          component={FriendsNavigator}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Icon
                name="people"
                color={focused ? "black" : "grey"}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default AppNavigator;
