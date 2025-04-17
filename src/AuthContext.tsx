import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  usertoken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usertoken, setUsertoken] = useState<string | null>(
    () => localStorage.getItem("token")
  );

  const login = (token: string) => {
    console.log("setting token")
    localStorage.setItem("token", token);
    setUsertoken(token);
  };

  const logout = () => {
    console.log("logout")
    localStorage.removeItem("token");
    setUsertoken(null);
  };

  return (
    <AuthContext.Provider value={{ usertoken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
