import React from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";

// themed Components
import Spacer from "@/components/Spacer";
import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedView from "@/components/ThemedView";
import { Colors } from "@/constant/colors";
import { useBook } from "@/hooks/useBook";
import { useRouter } from "expo-router";
ThemedButton;
Spacer;

const Create = () => {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { createBook } = useBook();
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    if (!title || !author || !description) {
      alert("Please fill all fields");
      setLoading(false);
      return;
    }
    await createBook({ title, author, description });

    // reset fields
    setTitle("");
    setAuthor("");
    setDescription("");

    // navigate to books list
    router.replace("/books");

    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText title={true} style={styles.heading}>
          Create A New Book
        </ThemedText>
        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
        />

        <Spacer />

        <ThemedTextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />

        <Spacer />

        <ThemedButton
          style={{ backgroundColor: Colors.primary }}
          onPress={handleSubmit}
          disabled={loading}
        >
          <ThemedText>{loading ? "Creating..." : "Create"}</ThemedText>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
  },
});
