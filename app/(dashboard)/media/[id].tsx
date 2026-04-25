import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

const MediaDetail = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>MediaDetail</ThemedText>
    </ThemedView>
  );
};

export default MediaDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
