import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-500"
        >
          AI Interviewer
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="hover:text-blue-400 transition duration-300"
          >
            Home
          </Link>

          <a
            href="#features"
            className="hover:text-blue-400 transition duration-300"
          >
            Features
          </a>

          <a
            href="#about"
            className="hover:text-blue-400 transition duration-300"
          >
            About
          </a>

          <Link
            to="/login"
            className="hover:text-blue-400 transition duration-300"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
          >
            Signup
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-6 py-4 flex flex-col gap-4">

          <Link
            to="/"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <a
            href="#features"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>

          <a
            href="#about"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>

          <Link
            to="/login"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-center"
            onClick={() => setMenuOpen(false)}
          >
            Signup
          </Link>

        </div>
      )}
    </nav>
  );
};

export default Navbar;