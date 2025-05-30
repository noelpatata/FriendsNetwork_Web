import { createContext, useContext, useState, useEffect } from "react";
import { LoginDTO } from "./domain/models/Login/LoginDTO";

interface AuthContextType {
  user: LoginDTO | null;
  login: (loginData: LoginDTO) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUsertoken] = useState<LoginDTO | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("login_data");
    if (storedData) {
      setUsertoken(JSON.parse(storedData));
    }
  }, []);

  const login = (loginData: LoginDTO) => {
    localStorage.setItem("login_data", JSON.stringify(loginData));
    setUsertoken(loginData);
  };

  const logout = () => {
    localStorage.removeItem("login_data");
    setUsertoken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
