import { Colors } from "@/constant/colors";
import { UserProvider } from "@/contexts/UserContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

const RootLayout = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  console.log(colorScheme);
  return (
    <UserProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            //  headerShown: false
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(dashboard)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </UserProvider>
  );
};

export default RootLayout;
