import Spacer from "@/components/Spacer";
import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedView from "@/components/ThemedView";
import { Colors } from "@/constant/colors";
import { useUser } from "@/hooks/useUser";
import { Link } from "expo-router";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

const register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { register } = useUser();

  const handleSubmit = () => {
    setError(null);
    try {
      register(email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText title={true} style={styles.title}>
          Register For An Account
        </ThemedText>

        <Spacer />
        <ThemedTextInput
          style={{ width: "80%" }}
          placeholder="Email"
          placeholderTextColor="gray"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <Spacer />
        <ThemedTextInput
          style={{ width: "80%" }}
          placeholder="Password"
          placeholderTextColor="gray"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        <Spacer />

        <ThemedButton
          style={{ backgroundColor: Colors.primary }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </ThemedButton>

        {error && (
          <ThemedText style={{ color: Colors.warning }}>{error}</ThemedText>
        )}

        <Spacer height={80} />

        <Link href="/login">
          <ThemedText>login instead</ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
});
