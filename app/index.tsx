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

      <ThemedText title={true} style={styles.title}>
        The Number 1
      </ThemedText>
      <ThemedText>Reading List App</ThemedText>

      <Spacer />

      <Link href="/login">
        <ThemedText style={styles.link}>login</ThemedText>
      </Link>

      <Spacer height={10} />

      <Link href="/login">
        <ThemedText style={styles.link}>Register </ThemedText>
      </Link>

      <Spacer height={10} />

      <Link href="/profile">
        <ThemedText style={styles.link}>profile </ThemedText>
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  link: {
    textDecorationLine: "underline",
  },
});
