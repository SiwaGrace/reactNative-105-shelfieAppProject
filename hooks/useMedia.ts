import { MediaContext } from "@/contexts/MediaContext";
import { useContext } from "react";

export function useMedia() {
  const context = useContext(MediaContext);

  if (!context) {
    throw new Error("useMedia must be used within a BookProvider");
  }

  return context;
}
