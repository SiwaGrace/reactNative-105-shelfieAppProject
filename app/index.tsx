import Spacer from "@/components/Spacer";
import ThemedLogo from "@/components/ThemedLogo";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo style={{ width: 100, height: 100 }} />
      <Spacer height={20} />

      <ThemedText title={true}>Hello word</ThemedText>
      <Link href="/login">
        <ThemedText>login</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
