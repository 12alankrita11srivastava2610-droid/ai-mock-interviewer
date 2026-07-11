import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log(
        "LOGIN RESPONSE:",
        res.data
      );

      // Save JWT Token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // Save User Name for PDF Reports
      localStorage.setItem(
        "userName",
        res.data.name || "Candidate"
      );

      alert("Login Successful");

      // Navigate to Dashboard
      navigate("/dashboard");

    } catch (error) {
      console.log(
        "LOGIN ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      {/* Background Blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>

      <motion.div
        initial={{
          opacity: 0,
          y: 80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 bg-white/5 backdrop-blur-lg border border-gray-800 rounded-3xl p-10 w-full max-w-md shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-white text-center">
          Welcome Back
        </h2>

        <p className="text-gray-400 text-center mt-3">
          Login to continue your AI interview journey
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >
          {/* Email */}
          <div>
            <label className="text-gray-300 block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center mt-8">
          Don't have an account?

          <Link
            to="/signup"
            className="text-blue-500 ml-2 hover:underline"
          >
            Signup
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;