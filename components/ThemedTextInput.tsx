import React from "react";
import { TextInput, useColorScheme } from "react-native";
import { Colors } from "../constant/colors";

export type ThemedTextInputProps = {
  style?: any;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  onChangeText: (text: string) => void;
  value: string;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  multiline?: boolean;
};
const ThemedTextInput = ({ style, ...props }: ThemedTextInputProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      placeholderTextColor={theme.text}
      {...props}
    />
  );
};

export default ThemedTextInput;
