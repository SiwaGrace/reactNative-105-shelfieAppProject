import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";

import type { Book } from "@/contexts/BooksContext";
import { useBook } from "@/hooks/useBook";

// themed Components
import ThemedButton from "@/components/ThemedButton";
import ThemedCard from "@/components/ThemedCard";
import ThemedLoader from "@/components/ThemedLoader";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";

const BookDetail = () => {
  const [book, setBook] = React.useState<Book | null>(null);
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const { fetchBookById, deleteBook } = useBook();

  const handleDelete = async () => {
    if (!book) return;
    await deleteBook(book.$id);
    setBook(null);
    router.push("/books");
  };

  useEffect(() => {
    async function loadBook() {
      try {
        const bookData = await fetchBookById(id as string);
        setBook(bookData);
      } catch (error) {
        console.error("Error loading book:", error);
      }
    }
    loadBook();
  }, [id]);

  if (!book)
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard>
        <ThemedText style={styles.heading}>
          {book?.title || "Loading..."}
        </ThemedText>
        <ThemedText style={{ fontSize: 16, color: "gray" }}>
          by {book?.author || "Loading..."}
        </ThemedText>
        <ThemedText style={{ marginTop: 20 }}>
          {book?.description || "Loading..."}
        </ThemedText>
      </ThemedCard>

      <ThemedButton style={styles.delete} onPress={handleDelete}>
        <Text style={{ color: "white", textAlign: "center" }}>Delete Book</Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heading: {
    fontSize: 24,
  },
  delete: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
