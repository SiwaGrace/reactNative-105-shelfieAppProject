import Spacer from "@/components/Spacer";
import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { Colors } from "@/constant/colors";
import { useMedia } from "@/hooks/useMedia";
import { useUser } from "@/hooks/useUser";
import { MediaItem } from "@/types/media";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.36;

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

// ── stat card ─────────────────────────────────────────────
const StatCard = ({
  label,
  count,
  icon,
  color,
}: {
  label: string;
  count: number;
  icon: string;
  color: string;
}) => (
  <View style={[styles.statCard, { flex: 1 }]}>
    <View>
      <ThemedText style={styles.statLabel}>{label}</ThemedText>
      <ThemedText style={styles.statCount}>{count}</ThemedText>
    </View>
    <View style={[styles.statIcon, { backgroundColor: color + "22" }]}>
      <ThemedText style={{ fontSize: 22 }}>{icon}</ThemedText>
    </View>
  </View>
);

// ── recently added card ───────────────────────────────────
const MediaCard = ({ item }: { item: MediaItem }) => {
  const color = typeColor[item.type] ?? "#ba9eff";
  return (
    <View style={styles.mediaCard}>
      <View style={styles.mediaCover}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.mediaCoverPlaceholder,
              { backgroundColor: color + "33" },
            ]}
          >
            <ThemedText style={{ fontSize: 28 }}>
              {typeIcon[item.type]}
            </ThemedText>
          </View>
        )}
      </View>
      <ThemedText style={styles.mediaTitle} numberOfLines={1}>
        {item.title}
      </ThemedText>
      <ThemedText style={styles.mediaSub}>
        {item.type.charAt(0).toUpperCase() + item.type.slice(1)} •{" "}
        {timeAgo(item.$createdAt)}
      </ThemedText>
    </View>
  );
};

// ── main screen ───────────────────────────────────────────
const Profile = () => {
  const { logout, user } = useUser();
  const { mediaList } = useMedia(); // all user media
  const router = useRouter();

  const books = mediaList.filter((m) => m.type === "book").length;
  const anime = mediaList.filter((m) => m.type === "anime").length;
  const manhwa = mediaList.filter((m) => m.type === "manhwa").length;

  // most recently added — last 10
  const recent = [...mediaList]
    .sort(
      (a, b) =>
        new Date(b.$createdAt ?? 0).getTime() -
        new Date(a.$createdAt ?? 0).getTime(),
    )
    .slice(0, 10);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const firstName = user?.name?.split("")[0] ?? "there";

  return (
    <ThemedView safe={true} style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── greeting ── */}
        <View style={styles.section}>
          <ThemedText style={styles.welcomeLabel}>WELCOME BACK</ThemedText>
          <ThemedText style={styles.greeting}>
            {greeting()}, {firstName}!
          </ThemedText>
          <View style={styles.accentBar} />
        </View>

        {/* ── stats bento ── */}
        <View style={styles.section}>
          <View style={styles.row}>
            <StatCard label="Books" count={books} icon="📖" color="#de4bf4" />
            <StatCard label="Anime" count={anime} icon="🎬" color="#53ddfc" />
          </View>
          <Spacer />
          <View style={styles.row}>
            <StatCard label="Manhwa" count={manhwa} icon="📚" color="#ba9eff" />
            <StatCard
              label="Total"
              count={mediaList.length}
              icon="🗂️"
              color="#ba9eff"
            />
          </View>
        </View>

        {/* ── recently added ── */}
        {recent.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>
                Recently Added
              </ThemedText>
            </View>
            <FlatList
              data={recent}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => <MediaCard item={item} />}
              contentContainerStyle={{ gap: 14, paddingRight: 24 }}
              scrollEnabled={true}
            />
          </View>
        )}

        {/* ── account ── */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Account</ThemedText>
          <View style={styles.accountCard}>
            <View style={styles.avatar}>
              <ThemedText style={styles.avatarLetter}>
                {// user?.name ??
                (user?.email ?? "U")?.charAt(0).toUpperCase()}
              </ThemedText>
            </View>
            <View style={{ flex: 1 }}>
              {user?.name && (
                <ThemedText style={styles.accountName}>{user.name}</ThemedText>
              )}
              <ThemedText style={styles.accountEmail}>{user?.email}</ThemedText>
            </View>
          </View>
        </View>

        {/* ── logout ── */}
        <View style={[styles.section, { alignItems: "center" }]}>
          <ThemedButton style={styles.logoutBtn} onPress={logout}>
            <ThemedText style={{ color: "white", fontWeight: "600" }}>
              Logout
            </ThemedText>
          </ThemedButton>
        </View>

        <Spacer />
      </ScrollView>

      {/* ── FAB → create ── */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/create")}
        activeOpacity={0.85}
      >
        <ThemedText style={styles.fabIcon}>+</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 100, paddingTop: 8 },

  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  row: { flexDirection: "row", gap: 12 },

  // greeting
  welcomeLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    color: Colors.primary,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  greeting: { fontSize: 26, fontWeight: "800", letterSpacing: -0.5 },
  accentBar: {
    width: 64,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 99,
    marginTop: 12,
  },

  // stats
  statCard: {
    backgroundColor: "#141f38",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statLabel: { fontSize: 12, color: "#a3aac4", marginBottom: 4 },
  statCount: { fontSize: 26, fontWeight: "800" },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },

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
  mediaSub: { fontSize: 11, color: "#a3aac4", marginTop: 2 },

  // account
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#141f38",
    borderRadius: 14,
    padding: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 99,
    backgroundColor: Colors.primary + "33",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: { fontSize: 20, fontWeight: "700", color: Colors.primary },
  accountName: { fontSize: 15, fontWeight: "600" },
  accountEmail: { fontSize: 13, color: "#a3aac4", marginTop: 2 },

  // logout
  logoutBtn: { backgroundColor: "#a70138", borderRadius: 12 },

  // fab
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 99,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  fabIcon: { fontSize: 28, fontWeight: "300", color: "white", lineHeight: 32 },
});
