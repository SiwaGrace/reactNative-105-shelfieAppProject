import Spacer from "@/components/Spacer";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { Colors } from "@/constant/colors";
import { useBook } from "@/hooks/useBook";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";

const Books = () => {
  const { books, fetchBooks } = useBook();
  const router = useRouter();

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedText style={styles.heading}>Your Reading Books</ThemedText>

      <Spacer />

      {books.length === 0 ? (
        <ThemedView style={styles.books}>
          <ThemedText>No books found</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/books/[id]",
                  params: { id: item.$id },
                })
              }
            >
              <ThemedCard style={styles.card}>
                <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.title}
                </ThemedText>
                <ThemedText style={{ fontSize: 16, color: "gray" }}>
                  by {item.author}
                </ThemedText>
              </ThemedCard>
            </Pressable>
          )}
        />
      )}
    </ThemedView>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    marginTop: 20,
  },
  card: {
    marginBottom: 15,
    padding: 10,
    marginLeft: 20,
    marginRight: 10,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 5,
  },
  books: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
