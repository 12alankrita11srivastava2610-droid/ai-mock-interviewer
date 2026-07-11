import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Interview() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [techStack, setTechStack] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/interview/generate",
        {
          role,
          experience,
          techStack,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem(
  "questions",
  JSON.stringify(res.data.questions)
);

localStorage.setItem(
  "interviewId",
  res.data._id
);

console.log(
  "Saved Interview ID:",
  res.data._id
);

      setQuestions(res.data.questions);

      localStorage.setItem(
        "questions",
        JSON.stringify(res.data.questions)
      );

      alert("Interview Generated Successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Error Generating Interview"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-6">

      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-3xl bg-white/5 backdrop-blur-lg border border-gray-800 rounded-3xl p-10"
      >
        <h1 className="text-4xl font-bold text-white text-center">
          AI Mock Interview
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Generate interview questions instantly
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <input
            type="text"
            placeholder="Role (Java Developer)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white"
            required
          />

          <input
            type="text"
            placeholder="Experience (1 Year)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white"
            required
          />

          <input
            type="text"
            placeholder="Tech Stack (Java, Spring Boot, MySQL)"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Generate Interview
          </button>
        </form>

        {questions.length > 0 && (
          <div className="mt-10">

            <h2 className="text-2xl font-bold text-white mb-4">
              Generated Questions
            </h2>

            <div className="space-y-3">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="bg-black/40 border border-gray-700 rounded-xl p-4 text-white"
                >
                  {index + 1}. {q}
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                navigate("/voice-interview")
              }
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              🎤 Start Voice Interview
            </button>

          </div>
        )}

      </motion.div>
    </div>
  );
}

export default Interview;