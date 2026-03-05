import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import { useAuth } from "./context/AuthContext";
import loginImage from "../../assets/login.png";
import googleLogo from "../../assets/Google_logo.svg";
import githubLogo from "../../assets/Github_logo.svg";
import { toast } from 'sonner'

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
      toast.success('Welcome back!')
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
    <div className="flex h-screen bg-[#f4f8fb]">

      {/* LEFT IMAGE SECTION */}
      <section className="w-1/2 hidden md:block">
        <img
          src={loginImage}
          alt="Login"
          className="h-full w-full object-cover"
        />
      </section>

      {/* RIGHT FORM SECTION */}
      <section className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-105 bg-white p-10 rounded-2xl shadow-lg">

          {/* LOGO */}
          <h1
            className="text-4xl font-bold text-center mb-2 text-white"
            style={{ WebkitTextStroke: "1.5px #1068dc" }}
          >
            Grab Pic
          </h1>

          <h2 className="text-xl font-semibold text-center mb-8 text-gray-700">
            Welcome Back 👋
          </h2>

          {/* LOCAL LOGIN */}
          <form onSubmit={handleLocalLogin} className="space-y-4">

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1068dc]"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1068dc]"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#1068dc] text-white font-semibold hover:bg-[#0d57b7] transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition mb-2"
          >
            <img src={googleLogo} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          {/* GITHUB LOGIN */}
          <button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            <img src={githubLogo} alt="github" className="w-5 h-5" />
            Continue with GitHub
          </button>

          {/* REGISTER */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#1068dc] font-medium hover:underline">
              Register
            </Link>
          </p>

        </div>
      </section>

    </div>
  );
};

export default Login;
