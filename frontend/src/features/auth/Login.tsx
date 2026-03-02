import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import { useAuth } from "./context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocalLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/login", form);
      await refreshUser();
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/github";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Event AI Photo App</h1>

      {/* 🔐 Local Login */}
      <form onSubmit={handleLocalLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <br />
      <hr />
      <br />

      {/* 🌍 OAuth */}
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <br /><br />
      <button onClick={handleGithubLogin}>Login with GitHub</button>

      <br /><br />
      <Link to="/register">Don't have an account? Register</Link>
    </div>
  );
};

export default Login;