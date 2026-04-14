import { BooksContext } from "@/contexts/BooksContext";
import { useContext } from "react";

export function useBook() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBook must be used within a BookProvider");
  }

  return context;
}
