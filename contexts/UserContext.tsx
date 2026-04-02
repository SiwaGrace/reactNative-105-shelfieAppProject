import { account } from "@/lib/appwrite";
import { createContext, useEffect, useState } from "react";
import { ID } from "react-native-appwrite";

type User = {
  id?: string;
  email?: string;
  name?: string;
} | null;

type UserContextType = {
  user: User;
  authChecked: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User>(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async function register(email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  // te get user on app start
  async function getInitialValue() {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialValue();
  }, [authChecked]);

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
}
