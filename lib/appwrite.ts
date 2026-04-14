import { Account, Avatars, Client, TablesDB } from "react-native-appwrite";
// Init your React Native SDK
export const client = new Client();

client
  .setEndpoint(`${process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT}`) // Your Appwrite Endpoint
  .setProject(`${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID}`) // Your project ID
  .setPlatform(`${process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME}`); // Your application ID or bundle ID.

export const account = new Account(client);
export const avatars = new Avatars(client);
export const db = new TablesDB(client);
export default client;
