import { Colors } from "@/constant/colors";
import React from "react";
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import ThemedView from "./ThemedView";

const ThemedLoader = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size={"large"} color={theme.text} />
    </ThemedView>
  );
};

export default ThemedLoader;

const styles = StyleSheet.create({});
