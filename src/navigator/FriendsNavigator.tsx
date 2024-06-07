import React from "react";
import FriendScreen from "../screens/FriendScreen";
import AddFriendScreen from "../screens/AddFriendScreen"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/SettingsScreen";

const MainStack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator(); 

function MainStackNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen
        name="FriendScreen"
        component={FriendScreen}
      />
    </MainStack.Navigator>
  );
}

const FriendsNavigator: React.FC = () => {
  return (
    <ModalStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "card", 
        animation: "slide_from_bottom", 
        animationDuration: 300,
        freezeOnBlur: true,
      }}
    >
      <ModalStack.Screen
        name="Main"
        component={MainStackNavigator}
        options={{ gestureEnabled: true }}
      />
      <ModalStack.Screen
        name="AddFriendScreen"
        component={AddFriendScreen}
        options={{
          gestureEnabled: false,
        }}
      />

<ModalStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          gestureEnabled: true,
          presentation: "modal",

        }}
      />
    </ModalStack.Navigator>
  );
};

export default FriendsNavigator;
