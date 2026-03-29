import React from "react";
import { View } from "react-native";

export type SpacerProps = {
  width?: any;
  height?: number;
};

const Spacer = ({ width = "100%", height = 40 }: SpacerProps) => {
  return <View style={{ width, height }} />;
};

export default Spacer;
