import { Colors } from "@/constant/colors";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

export type ThemedViewProps = {
  style?: any;
  children: React.ReactNode;
};
const ThemedView = ({ style, ...props }: ThemedViewProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  return (
    <View
      style={[{ padding: 10, backgroundColor: theme.background }, style]}
      {...props}
    />
  );
};

export default ThemedView;

const styles = StyleSheet.create({});
