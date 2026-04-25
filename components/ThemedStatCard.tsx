import { Colors } from "@/constant/colors";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import ThemedText from "./ThemedText";

const ThemedStatCard = ({
  label,
  count,
  icon,
  color,
}: {
  label: string;
  count: number;
  icon: string;
  color: string;
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <View
      style={[
        styles.statCard,
        { flex: 1, backgroundColor: theme.uiBackground },
      ]}
    >
      <View>
        <ThemedText style={styles.statLabel}>{label}</ThemedText>
        <ThemedText style={styles.statCount}>{count}</ThemedText>
      </View>
      <View style={[styles.statIcon, { backgroundColor: color + "22" }]}>
        <ThemedText style={{ fontSize: 22 }}>{icon}</ThemedText>
      </View>
    </View>
  );
};

export default ThemedStatCard;

const styles = StyleSheet.create({
  statCard: {
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statLabel: { fontSize: 12, marginBottom: 4 },
  statCount: { fontSize: 26, fontWeight: "800" },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
});
