// /types/media.ts
export const MEDIA_TYPES = ["book", "anime", "manhwa"] as const;
export type MediaType = (typeof MEDIA_TYPES)[number];

export const MEDIA_STATUS = ["planned", "ongoing", "completed"] as const;
export type MediaStatus = (typeof MEDIA_STATUS)[number];

export type MediaItem = {
  $id: string;
  title: string;
  description?: string;
  author?: string;

  type: MediaType;
  status: MediaStatus;

  image?: string;
  link?: string;

  rating?: number;

  tags?: string[];

  metadata?: {
    episodes?: number; // anime
    chapters?: number; // manhwa
  };

  userId: string;

  $createdAt?: string;
  $updatedAt?: string;
};
