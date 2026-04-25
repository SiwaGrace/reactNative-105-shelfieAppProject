import { MediaItem } from "@/types/media";
export function mapRowToMedia(row: any): MediaItem {
  return {
    $id: row.$id,
    title: row.title,
    description: row.description,

    type: row.type,
    status: row.status,

    image: row.image,
    link: row.link,

    rating: row.rating,
    tags: row.tags,

    userId: row.userId,

    metadata:
      typeof row.metadata === "string" ? JSON.parse(row.metadata) : undefined,

    $createdAt: row.$createdAt,
    $updatedAt: row.$updatedAt,
  };
}
