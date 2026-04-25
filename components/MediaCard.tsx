import { MediaItem } from "@/types/media";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";

// ── tiny helpers ──────────────────────────────────────────
const typeColor: Record<string, string> = {
  book: "#de4bf4",
  anime: "#53ddfc",
  manhwa: "#ba9eff",
};

const typeIcon: Record<string, string> = {
  book: "📖",
  anime: "🎬",
  manhwa: "📚",
};

const timeAgo = (dateStr?: string) => {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 36e5);
  if (h < 24) return `Added ${h}h ago`;
  const d = Math.floor(h / 24);
  if (d === 1) return "Added yesterday";
  return `Added ${d}d ago`;
};

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.36;

const MediaCard = ({ item }: { item: MediaItem }) => {
  const color = typeColor[item.type] ?? "#ba9eff";
  return (
    <ThemedView style={styles.mediaCard}>
      <View style={styles.mediaCover}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require("@/assets/images/book.jpg")}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
        )}
      </View>
      <ThemedText style={styles.mediaTitle} numberOfLines={1}>
        {item.title}
      </ThemedText>
      <ThemedText style={styles.mediaSub}>
        {item.type.charAt(0).toUpperCase() + item.type.slice(1)} •{" "}
        {timeAgo(item.$createdAt)}
      </ThemedText>
    </ThemedView>
  );
};

export default MediaCard;

const styles = StyleSheet.create({
  // media cards
  mediaCard: { width: CARD_WIDTH },
  mediaCover: {
    aspectRatio: 2 / 3,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
    backgroundColor: "#141f38",
  },
  mediaCoverPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mediaTitle: { fontSize: 13, fontWeight: "700" },
  mediaSub: { fontSize: 11, marginTop: 2 },
});
