import { Colors } from "@/constant/colors";
import React from "react";
import { Text, useColorScheme } from "react-native";

export type ThemedTextProps = {
  style?: any;
  children: any;
  title?: boolean;
};

const ThemedText = ({ style, title, ...props }: ThemedTextProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <Text
      style={[{ color: title ? theme.title : theme.text }, style]}
      {...props}
    />
  );
};

export default ThemedText;
