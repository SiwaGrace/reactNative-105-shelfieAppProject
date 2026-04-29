// lib/cloudinary.ts

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const uploadImageToCloudinary = async (uri: string): Promise<string> => {
  const formData = new FormData();

  // ✅ detect file extension from uri
  const filename = uri.split("/").pop() ?? "upload.jpg";
  const extension = filename.split(".").pop()?.toLowerCase() ?? "jpg";

  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    heic: "image/heic",
  };

  const type = mimeTypes[extension] ?? "image/jpeg";

  formData.append("file", {
    uri,
    type, // ✅ dynamic type
    name: filename,
  } as any);

  formData.append("upload_preset", UPLOAD_PRESET!);
  formData.append("folder", "MediaTrackerApp");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) throw new Error("Upload failed");

  const data = await response.json();
  return data.secure_url;
};
