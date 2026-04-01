import React from "react";
import { Pressable, useColorScheme } from "react-native";
import { Colors } from "../constant/colors";

type ThemedButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
};

const ThemedButton = ({ style, ...props }: ThemedButtonProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  return (
    <Pressable
      style={[
        {
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedButton;
