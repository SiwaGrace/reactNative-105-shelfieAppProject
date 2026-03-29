import { Colors } from "@/constant/colors";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

export type ThemedCardProps = {
  style: any;
  children: React.ReactNode;
};
const ThemedCard = ({ style, ...props }: ThemedCardProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <View
      style={[{ backgroundColor: theme.uiBackground }, styles.card, style]}
      {...props}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20,
  },
});
