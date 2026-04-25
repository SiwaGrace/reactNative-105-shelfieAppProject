import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";

type FilterTabsProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (val: T) => void;
};

function FilterTabs<T extends string>({
  options,
  value,
  onChange,
}: FilterTabsProps<T>) {
  return (
    <ThemedView style={styles.container}>
      {options.map((option) => {
        const isActive = value === option;

        return (
          <TouchableOpacity
            key={option}
            style={[styles.button, isActive && styles.activeButton]}
            onPress={() => onChange(option)}
          >
            <ThemedText style={[styles.text, isActive && styles.activeText]}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </ThemedView>
  );
}

export default FilterTabs;

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  container: {
    flexDirection: "row",
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
  },
  activeText: {
    color: "#fff", // secondary/on-surface
  },
});
