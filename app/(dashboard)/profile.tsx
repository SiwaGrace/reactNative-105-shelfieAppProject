import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { StyleSheet } from "react-native";

const Profile = () => {
  const { logout, user } = useUser();

  console.log(user);

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedText>{user?.email}</ThemedText>

      <ThemedButton onPress={logout}>
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
  },
});
