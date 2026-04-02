import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import ThemedLoader from "../ThemedLoader";

type Props = {
  children: React.ReactNode;
};
const GuessOnly = ({ children }: Props) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && authChecked) {
      router.replace("/profile");
    }
  }, [user, authChecked]);

  if (!authChecked) {
    return <ThemedLoader />;
  }

  return <>{children}</>;
};

export default GuessOnly;

const styles = StyleSheet.create({});
