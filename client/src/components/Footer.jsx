import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* Logo + Description */}
        <div>

          <h2 className="text-3xl font-bold text-blue-500">
            AI Interviewer
          </h2>

          <p className="mt-6 text-gray-400 leading-relaxed">

            AI-powered mock interview platform designed
            to help students and professionals improve
            communication, confidence, and interview performance.

          </p>

        </div>

        {/* Quick Links */}
        <div>

          <h3 className="text-2xl font-semibold mb-6">
            Quick Links
          </h3>

          <ul className="space-y-4 text-gray-400">

            <li>
              <a
                href="/"
                className="hover:text-blue-500 transition duration-300"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#features"
                className="hover:text-blue-500 transition duration-300"
              >
                Features
              </a>
            </li>

            <li>
              <a
                href="#about"
                className="hover:text-blue-500 transition duration-300"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="/login"
                className="hover:text-blue-500 transition duration-300"
              >
                Login
              </a>
            </li>

          </ul>

        </div>

        {/* Social Links */}
        <div>

          <h3 className="text-2xl font-semibold mb-6">
            Connect
          </h3>

          <div className="flex gap-6 text-3xl">

            <a
              href="#"
              className="hover:text-blue-500 transition duration-300"
            >
              <FaGithub />
            </a>

            <a
              href="#"
              className="hover:text-blue-500 transition duration-300"
            >
              <FaLinkedin />
            </a>

            <a
              href="#"
              className="hover:text-blue-500 transition duration-300"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="hover:text-pink-500 transition duration-300"
            >
              <FaInstagram />
            </a>

          </div>

        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">

        © 2026 AI Interviewer Project. All rights reserved.

      </div>

    </footer>
  );
};

export default Footer;