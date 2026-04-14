import { useUser } from "@/hooks/useUser";
import { createContext, useEffect, useState } from "react";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { client, db } from "../lib/appwrite";

export type Book = {
  $id: string;
  title: string;
  description: string;
  author: string;
  userId: string;
};

type CreateBookInput = {
  title: string;
  author: string;
  description: string;
};

const mapRowToBook = (row: any): Book => ({
  $id: row.$id,
  title: row.title,
  author: row.author,
  description: row.description,
  userId: row.userId,
});

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const BOOKS_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_BOOKS_COLLECTION_ID;

type BookContextType = {
  books: Book[];
  fetchBooks: () => Promise<void>;
  fetchBookById: (id: string) => Promise<Book | null>;
  createBook: (data: CreateBookInput) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
};

export const BooksContext = createContext<BookContextType | undefined>(
  undefined,
);

export const BookProvider = ({ children }: any) => {
  const [books, setBooks] = useState<Book[]>([]);
  const { user } = useUser();

  async function fetchBooks() {
    try {
      const response = await db.listRows({
        databaseId: DATABASE_ID!,
        tableId: BOOKS_COLLECTION_ID!,
        queries: [Query.equal("userId", user?.$id!)],
      });
      const data: Book[] = response.rows.map(mapRowToBook);
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  async function fetchBookById(id: string): Promise<Book | null> {
    try {
      const response = await db.getRow({
        databaseId: DATABASE_ID!,
        tableId: BOOKS_COLLECTION_ID!,
        rowId: id,
      });
      return mapRowToBook(response);
    } catch (error) {
      console.error("Error fetching book by ID:", error);
      return null;
    }
  }

  async function createBook(data: CreateBookInput) {
    try {
      const newBook = await db.createRow({
        databaseId: DATABASE_ID!,
        tableId: BOOKS_COLLECTION_ID!,
        rowId: ID.unique(),
        data: { ...data, userId: user?.$id! },
        permissions: [
          Permission.read(Role.user(user?.$id!)),
          // Permission.write(Role.user(user?.$id!))
          Permission.delete(Role.user(user?.$id!)),
          Permission.update(Role.user(user?.$id!)),
        ],
      });
    } catch (error) {
      console.error("Error creating book:", error);
    }
  }

  async function deleteBook(id: string) {
    try {
      await db.deleteRow(DATABASE_ID!, BOOKS_COLLECTION_ID!, id);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  useEffect(() => {
    let unsubscribe: any;
    const channel = `databases.${DATABASE_ID}.tables.${BOOKS_COLLECTION_ID}.rows`;

    if (user) {
      fetchBooks();

      unsubscribe = client.subscribe(channel, (response) => {
        const { events, payload } = response;
        const row = payload as any;

        if (events.some((e) => e.includes("create"))) {
          setBooks((prev) => [...prev, mapRowToBook(row)]);
        }

        if (events.some((e) => e.includes("update"))) {
          setBooks((prev) =>
            prev.map((book) =>
              book.$id === row.$id ? mapRowToBook(row) : book,
            ),
          );
        }

        if (events.some((e) => e.includes("delete"))) {
          setBooks((prev) => prev.filter((book) => book.$id !== row.$id));
        }
      });
    } else {
      setBooks([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBooks,
        fetchBookById,
        createBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
