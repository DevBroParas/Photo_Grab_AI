import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import loginImage from "../../assets/login.png";
import googleLogo from "../../assets/Google_logo.svg";
import githubLogo from "../../assets/Github_logo.svg";
import { toast } from 'sonner'
import Button from "../../components/ui/Button";
import { loginService } from "../../services/AuthService";

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
      const res = await loginService(form);
      await refreshUser();
      navigate("/dashboard");
      toast.success('Welcome back!')
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
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
          <div className="flex items-center justify-center gap"><img src="../src/assets/Logo_3.png" alt="logo" className="h-10" /><h2 className="text-2xl font-bold text-gray-500 mr-3">Grab Pic</h2></div>

          <h2 className="flex items-center justify-center text-2xl font-semibold text-gray-500 p-3">Login</h2>


          {/* LOCAL LOGIN */}
          <form onSubmit={handleLocalLogin} className="space-y-4">

            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#686df4]"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#686df4]"
            />

            <Button
              type="submit"
              className="w-full"
              size="md"
            >
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 mb-2"
            variant="outline"
          >
            <img src={googleLogo} alt="Google" className="w-5 h-5" />
            Continue with Google
          </Button>
          {/* GITHUB LOGIN */}
          <Button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-3 "
            variant="outline"
          >
            <img src={githubLogo} alt="github" className="w-5 h-5" />
            Continue with GitHub
          </Button>

          {/* REGISTER */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#686df4] font-medium hover:underline">
              Register
            </Link>
          </p>

        </div>
      </section>

    </div>
  );
};

export default Login;
