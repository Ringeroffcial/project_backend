
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import ProfileScreen from "./Screens/ProfileScreen";
import NotificationsScreen from "./Screens/NotificationsScreen";
import SafetyScreen from "./Screens/SafetyScreen";
import ProfileDetailsScreen from "./Screens/ProfileDetailsScreen";
import HelpCenterScreen from "./Screens/HelpCenterScreen";
import ContactUsScreen from "./Screens/ContactUsScreen";
import EditProfileScreen from "./Screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#2171B5" />
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ title: "Notifications" }}
        />
        <Stack.Screen
          name="Safety"
          component={SafetyScreen}
          options={{ title: "Safety" }}
        />

        <Stack.Screen
          name="ProfileDetails"
          component={ProfileDetailsScreen}
          options={{ title: "Profile Details" }}
        />

        <Stack.Screen
          name="HelpCenter"
          component={HelpCenterScreen}
          options={{ title: "Help Center" }}
        />

        <Stack.Screen
          name="ContactUs"
          component={ContactUsScreen}
          options={{ title: "Contact Us" }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ title: "Edit Profile" }}
        />

      </Stack.Navigator>
    </NavigationContainer>

  );
}