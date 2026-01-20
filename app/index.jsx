import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import logo from "../assets/img/logo_light.png";
import { Link } from "expo-router";
import ThemedView from "../components/ThemedView";
import ThemedLogo from "../components/ThemedLogo";
import Spacer from "../components/Spacer";
import ThemedText from "../components/ThemedText";

const index = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo style={styles.img} />
      <Spacer height={20} />

      <ThemedText style={styles.title} title={true}>
        The Number 1 h
      </ThemedText>

      <Spacer height={10} />
      <ThemedText>Reading list App</ThemedText>
      <Spacer />

      <Link href="/login" style={styles.link}>
        <ThemedText>Login Page</ThemedText>
      </Link>

      <Link href="/register" style={styles.link}>
        <ThemedText>Register Page</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
