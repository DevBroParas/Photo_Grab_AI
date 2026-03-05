import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/api";
import { useAuth } from "./context/AuthContext";
import loginImage from "../../assets/login.png";
import googleLogo from "../../assets/Google_logo.svg";
import githubLogo from "../../assets/Github_logo.svg";
import { toast } from 'sonner'


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
      toast.success('Hello new user!')
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
    <div className="flex h-screen bg-[#eff2f7]">

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
          <div className="flex items-center justify-center gap"><img src="../src/assets/Logo_3.png" alt="logo" className="h-10" /><h2 className="text-2xl font-bold text-gray-500 mr-3">Grab Pic</h2></div>

          <h2 className="flex items-center justify-center text-2xl font-semibold text-gray-500 p-3">Register</h2>

          {/* LOCAL LOGIN */}
          <form onSubmit={handleLocalRegister} className="space-y-4">


            <input
              name="name"
              type="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1068dc]"
            />

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
              Register
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
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition mb-2"
          >
            <img src={googleLogo} alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          {/* GITHUB LOGIN */}
          <button
            onClick={handleGithubRegister}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
          >
            <img src={githubLogo} alt="github" className="w-5 h-5" />
            Continue with GitHub
          </button>

          {/* REGISTER */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#1068dc] font-medium hover:underline">
              Login
            </Link>
          </p>

        </div>
      </section>

    </div>)
}
