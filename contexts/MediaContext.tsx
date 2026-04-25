import { useUser } from "@/hooks/useUser";
import { mapRowToMedia } from "@/lib/mappers/media.mapper";
import { MediaItem, MediaStatus, MediaType } from "@/types/media";
import { createContext, useEffect, useState } from "react";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import client, { db } from "../lib/appwrite";

export type CreateMediaInput = {
  title: string;
  description: string;
  author?: string;
  type: MediaType;
  status: MediaStatus;
  image?: string;
  link?: string;
  rating?: number;
  tags?: string[];
  metadata?: {
    episodes?: number;
    chapters?: number;
  };
};
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const MEDIA_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_MEDIA_COLLECTION_ID;

type MediaContextType = {
  mediaList: MediaItem[];
  fetchMedia: () => Promise<void>;
  createMedia: (data: CreateMediaInput) => Promise<void>;
};

export const MediaContext = createContext<MediaContextType | undefined>(
  undefined,
);

export const MediaProvider = ({ children }: any) => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const { user } = useUser();

  async function fetchMedia() {
    try {
      if (!user?.$id) return;
      const response = await db.listRows({
        databaseId: DATABASE_ID!,
        tableId: MEDIA_COLLECTION_ID!,
        queries: [Query.equal("userId", user.$id)],
      });

      const data: MediaItem[] = response.rows.map(mapRowToMedia);
      console.log("media collection", data);
      setMediaList(data);
    } catch (error) {
      console.error("Error fetching Media:", error);
    }
  }

  async function createMedia(data: CreateMediaInput) {
    try {
      const newMedia = await db.createRow({
        databaseId: DATABASE_ID!,
        tableId: MEDIA_COLLECTION_ID!,
        rowId: ID.unique(),
        data: {
          ...data,
          userId: user?.$id!,
        },
        permissions: [
          Permission.read(Role.user(user?.$id!)),
          // Permission.write(Role.user(user?.$id!)),
          Permission.update(Role.user(user?.$id!)),
          Permission.delete(Role.user(user?.$id!)),
        ],
      });

      //   return newMedia;
    } catch (error) {
      console.error("Error creating media:", error);
    }
  }

  useEffect(() => {
    let unsubscribe: any;
    const channel = `databases.${DATABASE_ID}.tables.${MEDIA_COLLECTION_ID}.rows`;

    if (user) {
      fetchMedia();

      unsubscribe = client.subscribe(channel, (response) => {
        const { events, payload } = response;
        const row = payload as any;

        if (events.some((e) => e.includes("create"))) {
          setMediaList((prev) => [...prev, mapRowToMedia(row)]);
        }

        if (events.some((e) => e.includes("update"))) {
          setMediaList((prev) =>
            prev.map((book) =>
              book.$id === row.$id ? mapRowToMedia(row) : book,
            ),
          );
        }

        if (events.some((e) => e.includes("delete"))) {
          setMediaList((prev) => prev.filter((book) => book.$id !== row.$id));
        }
      });
    } else {
      setMediaList([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <MediaContext.Provider value={{ mediaList, fetchMedia, createMedia }}>
      {children}
    </MediaContext.Provider>
  );
};
