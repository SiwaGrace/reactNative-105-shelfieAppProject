import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

const Books = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Reading Books</ThemedText>
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
