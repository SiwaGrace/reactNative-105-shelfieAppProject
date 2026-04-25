import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "../constant/colors";
import ThemedText from "./ThemedText";

type SelectFieldProps<T> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  style: any;
};

function ThemedTextSelect<T extends string>({
  label,
  value,
  style,
  options,
  onChange,
}: SelectFieldProps<T>) {
  const [open, setOpen] = useState(false);
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <View style={style}>
      {/* Field */}
      <TouchableOpacity onPress={() => setOpen((v) => !v)}>
        <View style={[styles.field, { backgroundColor: theme.uiBackground }]}>
          <ThemedText style={styles.label}>{label}</ThemedText>
          <View style={styles.row}>
            <ThemedText style={styles.value}>{value}</ThemedText>
            <Ionicons
              name={open ? "chevron-up" : "chevron-down"}
              size={18}
              color={theme.iconColor}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={[styles.modal, { backgroundColor: theme.uiBackground }]}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  option === value && {
                    backgroundColor: theme.iconColor + "20",
                    borderRadius: 8,
                  },
                ]}
                onPress={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                <ThemedText
                  style={[
                    option === value && {
                      fontWeight: "700",
                      color: theme.iconColor,
                    },
                  ]}
                >
                  {option}
                </ThemedText>
                {option === value && (
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color={theme.iconColor}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default ThemedTextSelect;

const styles = StyleSheet.create({
  field: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    fontWeight: "600",
    fontSize: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    borderRadius: 12,
    padding: 16,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
