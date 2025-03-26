import { User } from "firebase/auth";
import { createContext } from "react";

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);

export default AuthContext;
