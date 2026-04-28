import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";
import ThemedTouchableOpacity from "./ThemedTouchableOpacity";

type Props = {
  image: string | null;
  onImageSelect: (uri: string) => void;
  style?: any;
};

const MediaImagePicker = ({ image, onImageSelect }: Props) => {
  const handlePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission to access media library is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9], // ✅ matches the 16:9 ratio from HTML
      quality: 0.8,
    });

    if (!result.canceled) {
      onImageSelect(result.assets[0].uri);
    }
  };

  return (
    <ThemedTouchableOpacity
      style={styles.container}
      onPress={handlePick}
      activeOpacity={0.8}
    >
      {image ? (
        // ✅ Show selected image as preview
        <>
          <Image source={{ uri: image }} style={styles.preview} />
          <View style={styles.overlay}>
            <ThemedText style={styles.changeText}>Tap to change</ThemedText>
          </View>
        </>
      ) : (
        // ✅ Empty state — matches HTML design
        <>
          <View style={styles.gradient} />
          <ThemedText style={styles.icon}>🖼️</ThemedText>
          <ThemedText style={styles.mainText}>Upload Cover Art</ThemedText>
          <ThemedText style={styles.subText}>
            Recommended: 1200 x 675px
          </ThemedText>
        </>
      )}
    </ThemedTouchableOpacity>
  );
};

export default MediaImagePicker;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    aspectRatio: 16 / 9, // ✅ 16:9 like HTML
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(150,150,150,0.4)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.08, // subtle background tint like your HTML gradient
  },
  icon: {
    fontSize: 36,
    marginBottom: 8,
  },
  mainText: {
    // color: "#cdd6f4",
    fontWeight: "600",
    fontSize: 15,
  },
  subText: {
    // color: "#7f849c",
    fontSize: 11,
    marginTop: 4,
  },
  preview: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  changeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
