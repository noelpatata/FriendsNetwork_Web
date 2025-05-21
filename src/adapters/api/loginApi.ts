import { LoginService } from "../../application/ports/loginService";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginApi: LoginService = {
  doLogin: async (username, password) => {

    const res = await fetch(`${API_BASE_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      return await res.json();
    },
  }