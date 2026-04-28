import FilterTabs from "@/components/FilterTabs";
import Spacer from "@/components/Spacer";
import ThemedText from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedView from "@/components/ThemedView";
import { useMedia } from "@/hooks/useMedia";
import {
  MEDIA_STATUS,
  MEDIA_TYPES,
  MediaStatus,
  MediaType,
} from "@/types/media";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

const Library = () => {
  const { mediaList } = useMedia();
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<MediaType>("book");
  const [search, setSearch] = useState("");

  const STATUS_OPTIONS = ["all", ...MEDIA_STATUS] as const;
  type StatusFilter = "all" | MediaStatus;
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("planned");

  const filteredMedia = mediaList
    .filter((item) => item.type?.toLocaleLowerCase() === selectedType)
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter((item) =>
      selectedStatus === "all"
        ? true
        : item.status?.toLocaleLowerCase() === selectedStatus,
    );

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedText style={styles.heading}>Your Library</ThemedText>

      <Spacer height={16} />
      <FilterTabs
        value={selectedType}
        onChange={setSelectedType}
        options={MEDIA_TYPES}
      />

      <Spacer height={16} />

      <ThemedTextInput
        icon={true}
        placeholder="Search by title..."
        onChangeText={setSearch}
      />

      <Spacer height={16} />
      <FilterTabs
        value={selectedStatus}
        onChange={setSelectedStatus}
        options={STATUS_OPTIONS}
      />

      <Spacer height={16} />

      {filteredMedia.length === 0 ? (
        <ThemedView style={styles.empty}>
          <ThemedText>No {selectedType} found</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={filteredMedia}
          keyExtractor={(item) => item.$id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.cardWrapper,
                pressed && { opacity: 0.85 },
              ]}
              onPress={() =>
                router.push({
                  pathname: "/media/[id]",
                  params: { id: item.$id },
                })
              }
            >
              {/* Cover Image with overlay */}
              <View style={styles.imageContainer}>
                <Image
                  source={
                    item.image
                      ? { uri: item.image }
                      : require("@/assets/images/book.jpg")
                  }
                  style={styles.coverImage}
                  resizeMode="cover"
                />

                {/* Gradient overlay at bottom */}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.gradient}
                />
                {/* Status badge */}
                {item.status && (
                  <View style={styles.badge}>
                    <ThemedText style={styles.badgeText}>
                      {item.status}
                    </ThemedText>
                  </View>
                )}
              </View>

              {/* Title & Author */}
              <ThemedText style={styles.title} numberOfLines={1}>
                {item.title}
              </ThemedText>
              <ThemedText style={styles.author} numberOfLines={1}>
                {item.author ?? item.description}
              </ThemedText>
            </Pressable>
          )}
        />
      )}
    </ThemedView>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
  },
  list: {
    paddingBottom: 32,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper: {
    width: CARD_WIDTH,
  },
  imageContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5, // 2:3 aspect ratio like the reference
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#e2e8f0",
    marginBottom: 8,
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(30, 30, 46, 0.75)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: "#c4b5fd",
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
  },
  author: {
    fontSize: 11,
    color: "gray",
  },
});
