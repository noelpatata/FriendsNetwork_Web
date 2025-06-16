import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { loginApi } from "../adapters/api/loginApi";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginApi.doLogin(username, password);
      if (!response.success) {
        throw new Error(response.message || "Login failed");
      }

      login(response.content?.viewModel!!);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form
        onSubmit={handleLogin}
        className=""
      >
        <h2 className="">Login</h2>

        {error && (
          <div className="">
            {error}
          </div>
        )}

        <div className="login-container-child">
          <label className="">Username</label>
          <input
            type="text"
            className="text-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="login-container-child">
          <label className="">Password</label>
          <input
            type="password"
            className="text-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-container-child">
          <button
            type="submit"
            className="button-dologin"
          >
            Login
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default Login;
