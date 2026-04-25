import MediaCard from "@/components/MediaCard";
import Spacer from "@/components/Spacer";
import ThemedButton from "@/components/ThemedButton";
import ThemedStatCard from "@/components/ThemedStatCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { Colors } from "@/constant/colors";
import { useMedia } from "@/hooks/useMedia";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

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
            <ThemedStatCard
              label="Books"
              count={books}
              icon="📖"
              color="#de4bf4"
            />
            <ThemedStatCard
              label="Anime"
              count={anime}
              icon="🎬"
              color="#53ddfc"
            />
          </View>
          <Spacer />
          <View style={styles.row}>
            <ThemedStatCard
              label="Manhwa"
              count={manhwa}
              icon="📚"
              color="#ba9eff"
            />
            <ThemedStatCard
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
          <ThemedView style={styles.accountCard}>
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
          </ThemedView>
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

  // account
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
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
