import React from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import MediaImagePicker from "@/components/MediaImagePicker";
import RatingInput from "@/components/RatingInput";
import Spacer from "@/components/Spacer";
import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedTextSelect from "@/components/ThemedTextSelect";
import ThemedView from "@/components/ThemedView";
import { Colors } from "@/constant/colors";
import { useMedia } from "@/hooks/useMedia";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import {
  MEDIA_STATUS,
  MEDIA_TYPES,
  MediaStatus,
  MediaType,
} from "@/types/media";
import { useRouter } from "expo-router";

const Create = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [type, setType] = React.useState<MediaType>("book");
  const [status, setStatus] = React.useState<MediaStatus>("planned");
  const [link, setLink] = React.useState("");
  const [ratings, setRatings] = React.useState(0);
  const [tagInput, setTagInput] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [metadata, setMetadata] = React.useState<number>(0);
  const [image, setImage] = React.useState<string | null>(null);

  const [loadingImage, setLoadingImage] = React.useState(false);
  // just a helper — reads the selected type and returns the right label
  const metadataLabel = type === "anime" ? "Episodes" : "Chapters";

  const { createMedia } = useMedia();
  const router = useRouter();

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleTagChange = (text: string) => {
    if (text.includes(",")) {
      const newTag = text.replace(",", "").trim();
      if (newTag.length > 0 && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    } else {
      setTagInput(text);
    }
  };

  const handleTypeChange = (newType: MediaType) => {
    setType(newType);
    setMetadata(0);
  };

  // remove a tag when user taps the x
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const fetchImage = async () => {
    if (!title.trim()) {
      alert("Enter a title first");
      return;
    }

    try {
      setLoadingImage(true);

      let url = "";

      if (type === "anime" || type === "manhwa") {
        url = `https://api.jikan.moe/v4/${type}?q=${title}&limit=1`;
      } else {
        url = `https://www.googleapis.com/books/v1/volumes?q=${title}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      let img = null;

      if (type === "anime" || type === "manhwa") {
        img = data?.data?.[0]?.images?.jpg?.image_url;
      } else {
        const book = data?.items?.[0];

        img = book?.volumeInfo?.imageLinks?.thumbnail;

        // 👇 ADD THIS
        const authorName = book?.volumeInfo?.authors?.[0];
        if (!author && authorName) {
          setAuthor(authorName);
        }
      }

      if (img) {
        setImage(img);
      } else {
        alert("No image found. Try another title.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch image");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!title || !type || !status) {
        alert("Please fill required fields");
        setLoading(false);
        return;
      }

      let imageUrl: string | undefined = undefined;

      // if (image) {
      //   imageUrl = await uploadImageToCloudinary(image);
      // }

      if (image) {
        if (image.startsWith("http")) {
          imageUrl = image; // already a URL from API
        } else {
          imageUrl = await uploadImageToCloudinary(image);
        }
      }

      // URL validation now lives inside handleSubmit
      if (link && !isValidUrl(link)) {
        alert("Please enter a valid URL");
        setLoading(false);
        return;
      }

      await createMedia({
        title,
        description,
        author,
        type,
        status,
        link,
        rating: ratings,
        tags,
        image: imageUrl,
        episodes: type === "anime" ? metadata : undefined,
        chapters: type !== "anime" ? metadata : undefined,
      });

      setTitle("");
      setDescription("");
      setAuthor("");
      setTagInput("");
      setLink("");
      setRatings(0);
      setTags([]);
      setMetadata(0);
      setImage(null);

      router.replace("/library");
      // setLoading(false);
    } catch (error) {
      alert("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // wrapped in ScrollView so form is scrollable
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ThemedText title={true} style={styles.heading}>
            Create Media
          </ThemedText>

          <Spacer />
          <ThemedTextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <Spacer />

          <TouchableOpacity
            onPress={fetchImage}
            disabled={loadingImage}
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <ThemedText style={{ color: "white" }}>
              {loadingImage ? "Fetching..." : "Fetch Image"}
            </ThemedText>
          </TouchableOpacity>

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
            multiline
          />

          <Spacer />
          <ThemedTextSelect
            label="Type"
            value={type}
            options={MEDIA_TYPES}
            onChange={handleTypeChange}
            style={styles.input}
          />

          <Spacer />

          <ThemedText style={{ textAlign: "left", paddingBottom: 5 }}>
            {metadataLabel}
          </ThemedText>
          <ThemedTextInput
            style={styles.input}
            placeholder={`Number of ${metadataLabel}`}
            value={metadata === 0 ? "" : String(metadata)}
            onChangeText={(text) =>
              // setMetadata(Number(text))
              {
                const num = parseInt(text);
                setMetadata(isNaN(num) ? 0 : num);
              }
            }
            keyboardType="numeric"
          />

          <Spacer />
          <ThemedTextSelect
            label="Status"
            value={status}
            options={MEDIA_STATUS}
            onChange={setStatus}
            style={styles.input}
          />

          <Spacer />
          <ThemedTextInput
            style={styles.input}
            placeholder="https://example.com"
            value={link}
            onChangeText={setLink}
            keyboardType="url"
          />

          <Spacer />
          <RatingInput rating={ratings} setRating={setRatings} />

          <Spacer />
          <ThemedTextInput
            style={styles.input}
            value={tagInput}
            onChangeText={handleTagChange}
            placeholder="Enter tags (comma separated)"
          />

          {/* show added tags so user knows they were added */}
          {tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                  <TouchableOpacity onPress={() => removeTag(tag)}>
                    <Text style={styles.tagRemove}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <Spacer />
          <MediaImagePicker image={image} onImageSelect={setImage} />

          <Spacer />
          <ThemedButton
            style={{ backgroundColor: Colors.primary }}
            onPress={handleSubmit}
            disabled={loading}
          >
            <ThemedText style={{ color: "white" }}>
              {loading ? "Creating..." : "Create"}
            </ThemedText>
          </ThemedButton>

          <Spacer />
        </ScrollView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
  },
  // Tag styles
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
    width: "80%",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  tagText: {
    color: "white",
    fontSize: 13,
  },
  tagRemove: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
