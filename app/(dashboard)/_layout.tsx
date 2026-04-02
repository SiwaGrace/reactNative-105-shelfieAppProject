import UserOnly from "@/components/auth/UserOnly";
import { Colors } from "@/constant/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

const DashboardLayout = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  return (
    <UserOnly>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 90,
          },
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor,
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="books"
          options={{
            title: "Books",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "book" : "book-outline"}
                size={24}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "add" : "add-outline"}
                size={24}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />
      </Tabs>
    </UserOnly>
  );
};

export default DashboardLayout;

const styles = StyleSheet.create({});
