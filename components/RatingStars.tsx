import { Colors } from "@/constant/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";

const RatingStars = ({ rating = 0 }: { rating: number }) => {
  const max = 5;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      {Array.from({ length: max }).map((_, i) => (
        <ThemedText key={i} style={{ fontSize: 16, color: Colors.primary }}>
          {i < Math.round(rating) ? "★" : "☆"}
        </ThemedText>
      ))}
      <ThemedText style={styles.ratingText}>
        {rating.toFixed(1)} / 5.0
      </ThemedText>
    </View>
  );
};

export default RatingStars;

const styles = StyleSheet.create({
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    // color: "#dee5ff",
    marginLeft: 4,
  },
});
