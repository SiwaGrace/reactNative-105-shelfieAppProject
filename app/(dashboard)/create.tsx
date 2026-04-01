import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

const Create = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Create Book</ThemedText>
    </ThemedView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
