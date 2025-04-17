import { createContext, useContext, useState, ReactNode } from "react";


type AuthContextType = {
  usertoken: string | null;
  login: (usertoken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usertoken, setUser] = useState<string | null>(null);

  const login = (userData: string) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ usertoken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
