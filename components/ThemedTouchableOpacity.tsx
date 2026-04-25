import { Colors } from "@/constant/colors";
import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

export type ThemedTouchableOpacityProps = {
  style?: any;
  onPress?: () => void;
  activeOpacity?: number;
  children: React.ReactNode;
};
const ThemedTouchableOpacity = ({
  style,
  ...props
}: ThemedTouchableOpacityProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: theme.background,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedTouchableOpacity;

const styles = StyleSheet.create({});
