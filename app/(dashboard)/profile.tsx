import Spacer from "@/components/Spacer";
import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { Colors } from "@/constant/colors";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { StyleSheet } from "react-native";

const Profile = () => {
  const { logout, user } = useUser();

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedText title={true}>{user?.email}</ThemedText>

      <Spacer />
      <ThemedText style={{ textAlign: "center", paddingHorizontal: 20 }}>
        Start adding books to your shelf by navigating to the Books tab below.
      </ThemedText>

      <Spacer />

      <ThemedButton
        style={{ backgroundColor: Colors.primary }}
        onPress={logout}
      >
        <ThemedText>Logout</ThemedText>
      </ThemedButton>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
