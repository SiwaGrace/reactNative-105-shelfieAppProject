import { Colors } from "@/constant/colors";
import { useMedia } from "@/hooks/useMedia";
import { MediaItem } from "@/types/media";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";

import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import RatingStars from "@/components/RatingStars";
import ThemedLoader from "@/components/ThemedLoader";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const statusLabel: Record<string, string> = {
  planned: "Plan to Read",
  ongoing: "Currently Watching",
  completed: "Completed",
};

const Pill = ({ icon, label }: { icon: string; label: string }) => (
  <View style={styles.pill}>
    <ThemedText style={styles.pillIcon}>{icon}</ThemedText>
    <ThemedText style={styles.pillText}>{label}</ThemedText>
  </View>
);

// ── main ─────────────────────────────────────────────────
const MediaDetail = () => {
  const [media, setMedia] = React.useState<MediaItem | null>(null);
  // const [deleting, setDeleting] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const { fetchMediaById, deleteMedia } = useMedia();

  useEffect(() => {
    async function loadMedia() {
      try {
        const data = await fetchMediaById(id as string);
        setMedia(data);
      } catch (e) {
        console.error("Error loading media:", e);
      }
    }
    loadMedia();
  }, [id]);

  const handleDelete = async () => {
    if (!media) return;

    setDeletingId(media.$id);

    await deleteMedia(media.$id);

    setDeletingId(null);

    router.replace("/library");
  };

  if (!media)
    return (
      <ThemedView safe style={styles.center}>
        <ThemedLoader />
      </ThemedView>
    );

  const metaCount =
    media.type === "anime"
      ? media.episodes
        ? `${media.episodes} Episodes`
        : null
      : media.chapters
        ? `${media.chapters} Chapters`
        : null;

  return (
    <ThemedView safe={false} style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        {/* ── HERO ── */}
        <ThemedView style={styles.hero}>
          {media.image ? (
            <Image
              source={{ uri: media.image }}
              style={StyleSheet.absoluteFillObject}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.heroPlaceholder]}>
              <ThemedText style={{ fontSize: 64 }}>
                {media.type === "anime"
                  ? "🎬"
                  : media.type === "manhwa"
                    ? "📚"
                    : "📖"}
              </ThemedText>
            </View>
          )}

          {/* gradient overlays */}
          <LinearGradient
            colors={["transparent", "rgba(212, 167, 241, 0.8)"]}
            style={styles.gradient}
          />

          {/* back button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* hero info */}
          <View style={styles.heroInfo}>
            <View style={styles.heroTopRow}>
              <View style={[styles.statusBadge]}>
                <ThemedText style={[styles.statusBadgeText]}>
                  {statusLabel[media.status] ?? media.status}
                </ThemedText>
              </View>
              {(media.rating ?? 0) > 0 && (
                <RatingStars rating={media.rating!} />
              )}
            </View>
            <ThemedText style={styles.heroTitle}>{media.title}</ThemedText>
          </View>
        </ThemedView>

        {/* ── BODY ── */}
        <ThemedView style={styles.body}>
          {/* metadata pills */}
          <View style={styles.pillRow}>
            <Pill icon="🎭" label={media.type.toUpperCase()} />
            {media.author && <Pill icon="✍️" label={media.author} />}
            {metaCount && <Pill icon="📋" label={metaCount} />}
            {media.$createdAt && (
              <Pill
                icon="📅"
                label={new Date(media.$createdAt).getFullYear().toString()}
              />
            )}
          </View>

          {/* synopsis */}
          {media.description && (
            <View style={styles.section}>
              <ThemedText style={styles.sectionLabel}>SYNOPSIS</ThemedText>
              <ThemedText style={styles.synopsis}>
                {media.description}
              </ThemedText>
            </View>
          )}

          {/* tags */}
          {(media.tags ?? []).length > 0 && (
            <View style={styles.section}>
              <ThemedText style={styles.sectionLabel}>CATEGORIES</ThemedText>
              <View style={styles.tagRow}>
                {media.tags!.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <ThemedText style={styles.tagText}>{tag}</ThemedText>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* action card */}
          <View style={styles.actionCard}>
            {/* open link */}
            {media.link && (
              <TouchableOpacity
                style={[styles.primaryBtn, { backgroundColor: Colors.primary }]}
                onPress={() => Linking.openURL(media.link!)}
                activeOpacity={0.85}
              >
                <ThemedText style={styles.primaryBtnText}>
                  🔗 Open Link
                </ThemedText>
              </TouchableOpacity>
            )}

            {/* edit / delete row */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.secondaryBtn}
                // onPress={() => router.push(`/edit/${media.$id}`)}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.secondaryBtnText}>✏️ Edit</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.secondaryBtn, styles.deleteBtn]}
                onPress={handleDelete}
                disabled={deletingId === media.$id}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.deleteBtnText}>
                  {deletingId ? "Deleting..." : "🗑  Delete"}
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* divider */}
            <View style={styles.divider} />

            {/* meta rows */}
            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>Last Updated</ThemedText>
              <ThemedText style={styles.metaValue}>
                {media.$updatedAt
                  ? new Date(media.$updatedAt).toLocaleDateString()
                  : "—"}
              </ThemedText>
            </View>

            <View style={styles.metaRow}>
              <ThemedText style={styles.metaLabel}>Added</ThemedText>
              <ThemedText style={styles.metaValue}>
                {media.$createdAt
                  ? new Date(media.$createdAt).toLocaleDateString()
                  : "—"}
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

export default MediaDetail;

const HERO_HEIGHT = height * 0.55;

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },

  // hero
  hero: {
    width,
    height: HERO_HEIGHT,
    position: "relative",
  },
  heroPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
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
  backBtn: {
    position: "absolute",
    top: 52,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 99,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { fontSize: 25, color: "white" },
  heroInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    gap: 12,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99 },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
    lineHeight: 38,
  },

  // body
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
    gap: 28,
  },
  pillRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#40485d33",
  },
  pillIcon: { fontSize: 13 },
  pillText: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // section
  section: { gap: 10 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ba9eff",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  synopsis: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "300",
  },

  // tags
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 99,
    backgroundColor: "#192540",
    borderWidth: 0.5,
    borderColor: "#40485d44",
  },
  tagText: { fontSize: 13, color: "#dee5ff" },

  // action card
  actionCard: {
    borderRadius: 24,
    padding: 24,
    gap: 16,
    borderWidth: 0.5,
    borderColor: Colors.primary,
  },
  primaryBtn: { borderRadius: 99, paddingVertical: 16, alignItems: "center" },
  primaryBtnText: { fontSize: 16, fontWeight: "700", color: "white" },
  actionRow: { flexDirection: "row", gap: 12 },
  secondaryBtn: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#40485d33",
  },
  secondaryBtnText: { fontSize: 14, fontWeight: "500" },
  deleteBtn: { borderColor: "#a7013833" },
  deleteBtnText: { fontSize: 14, fontWeight: "500", color: "#ff6e84" },
  divider: { height: 0.5, backgroundColor: Colors.primary },
  metaRow: { flexDirection: "row", justifyContent: "space-between" },
  metaLabel: {
    fontSize: 13,
  },
  metaValue: { fontSize: 13, fontWeight: "500" },
});
