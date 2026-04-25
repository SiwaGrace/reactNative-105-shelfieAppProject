import { Colors } from "@/constant/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";

const RatingInput = ({ rating, setRating }: any) => {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} onPress={() => setRating(star)}>
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={28}
            color={Colors.star}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default RatingInput;
