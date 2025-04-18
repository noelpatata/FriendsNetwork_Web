import { createContext, useContext, useState, useEffect } from "react";
import { LoginDTO } from "./domain/models/LoginDTO";

interface AuthContextType {
  usertoken: LoginDTO | null;
  login: (loginData: LoginDTO) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usertoken, setUsertoken] = useState<LoginDTO | null>(() => {
    const storedData = localStorage.getItem("login_data");
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    const loginData = localStorage.getItem("login_data");
    const parsedLoginData: LoginDTO = JSON.parse(loginData!!);
      const now = new Date().getTime();
      const expTime = new Date(parsedLoginData.expires).getTime();

      if (expTime > now) {
        setUsertoken(parsedLoginData);
      } else {
        localStorage.removeItem("login_data");
      }
  }, []);

  const login = (loginData: LoginDTO) => {
    console.log("setting token");

    localStorage.setItem("login_data", JSON.stringify(loginData));

    setUsertoken(loginData);
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("login_data");
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
