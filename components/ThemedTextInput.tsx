import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TextInput, useColorScheme, View } from "react-native";
import { Colors } from "../constant/colors";

export type ThemedTextInputProps = {
  style?: any;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "url";
  onChangeText: (text: string) => void;
  value?: string;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  multiline?: boolean;
  icon?: boolean;
};
const ThemedTextInput = ({ style, icon, ...props }: ThemedTextInputProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  if (icon) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.uiBackground,
          borderRadius: 8,
          paddingHorizontal: 12,
        }}
      >
        <Ionicons name="search" size={28} color={theme.iconColor} />
        <TextInput
          style={[
            {
              flex: 1,
              color: theme.text,
              padding: 20,
              borderRadius: 6,
            },
            style,
          ]}
          placeholderTextColor={theme.text}
          {...props}
        ></TextInput>
      </View>
    );
  }
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
