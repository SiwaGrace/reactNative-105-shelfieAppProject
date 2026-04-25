import { MEDIA_TYPES, MediaType } from "@/types/media";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "./ThemedText";

type Props = {
  value: MediaType;
  onChange: (type: MediaType) => void;
};

const MediaFilterTabs = ({ value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      {MEDIA_TYPES.map((type) => {
        const isActive = value === type;

        return (
          <TouchableOpacity
            key={type}
            style={[styles.button, isActive && styles.activeButton]}
            onPress={() => onChange(type)}
          >
            <ThemedText style={[styles.text, isActive && styles.activeText]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MediaFilterTabs;

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e", // surface-container-low
    padding: 6,
    borderRadius: 999,
    gap: 6,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#2c2c2c", // surface-container-high
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#aaa", // on-surface-variant
  },
  activeText: {
    color: "#fff", // secondary/on-surface
  },
});
