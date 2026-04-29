import { Colors } from "@/constant/colors";
import React from "react";
import { Image, useColorScheme } from "react-native";
import DarkLogo from "../assets/img/logo-dark_extra.png";
import LightLogo from "../assets/img/logo-light_extra.png";

export type ThemedLogoProps = {
  style: any;
};
const ThemedLogo = ({ ...props }: ThemedLogoProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const logo = colorScheme == "dark" ? DarkLogo : LightLogo;

  return <Image source={logo} {...props} />;
};

export default ThemedLogo;
