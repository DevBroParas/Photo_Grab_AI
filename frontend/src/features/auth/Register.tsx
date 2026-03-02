import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import { useAuth } from "./context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLocalRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      await refreshUser();
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  const handleGithubRegister = () => {
    window.location.href = "http://localhost:8080/api/auth/github";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Create Account</h1>

      {/* 📝 Local Register */}
      <form onSubmit={handleLocalRegister}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <br /><br />

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

        <button type="submit">Register</button>
      </form>

      <br />
      <hr />
      <br />

      {/* 🌍 OAuth Register */}
      <button onClick={handleGoogleRegister}>
        Sign up with Google
      </button>
      <br /><br />
      <button onClick={handleGithubRegister}>
        Sign up with GitHub
      </button>

      <br /><br />
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}