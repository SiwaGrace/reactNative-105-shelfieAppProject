import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import ThemedLoader from "../ThemedLoader";

type Props = {
  children: React.ReactNode;
};
const UserOnly = ({ children }: Props) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && authChecked) {
      router.replace("/login");
    }
  }, [user, authChecked]);

  if (!user || !authChecked) {
    return <ThemedLoader />;
  }

  return <>{children}</>;
};

export default UserOnly;

const styles = StyleSheet.create({});
