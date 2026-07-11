
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://import.meta.env.VITE_API_URL/api/interview/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalInterviews = interviews.length;

  const averageScore =
    interviews.length > 0
      ? (
          interviews.reduce(
            (sum, item) =>
              sum + (item.score || 0),
            0
          ) / interviews.length
        ).toFixed(1)
      : 0;

  const bestScore =
    interviews.length > 0
      ? Math.max(
          ...interviews.map(
            (item) => item.score || 0
          )
        )
      : 0;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-bold">
            AI Mock Interview Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Track your interview performance
            and improve with AI.
          </p>
        </div>

        <button
          onClick={logout}
          className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white/5 backdrop-blur-lg border border-gray-800 rounded-3xl p-6">

          <h3 className="text-gray-400">
            Total Interviews
          </h3>

          <p className="text-5xl font-bold text-blue-500 mt-4">
            {totalInterviews}
          </p>

        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-gray-800 rounded-3xl p-6">

          <h3 className="text-gray-400">
            Average Score
          </h3>

          <p className="text-5xl font-bold text-green-500 mt-4">
            {averageScore}
          </p>

        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-gray-800 rounded-3xl p-6">

          <h3 className="text-gray-400">
            Best Score
          </h3>

          <p className="text-5xl font-bold text-purple-500 mt-4">
            {bestScore}
          </p>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <div className="bg-gradient-to-r from-purple-700 to-purple-500 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold">
            Create New Interview
          </h2>

          <p className="mt-4">
            Generate AI-powered interview
            questions based on your role,
            experience and technology stack.
          </p>

          <button
            onClick={() =>
              navigate("/interview")
            }
            className="mt-6 bg-black px-6 py-3 rounded-xl"
          >
            Generate Interview
          </button>

        </div>

        <div className="bg-gradient-to-r from-cyan-700 to-cyan-500 p-8 rounded-3xl">

          <h2 className="text-3xl font-bold">
            Analytics & Reports
          </h2>

          <p className="mt-4">
            View AI feedback, charts,
            performance analytics and
            downloadable reports.
          </p>

          <button
            onClick={() =>
              navigate("/feedback")
            }
            className="mt-6 bg-black px-6 py-3 rounded-xl"
          >
            View Analytics
          </button>

        </div>

      </div>

      {/* Interview History */}

      <h2 className="text-3xl font-bold mb-6">
        Interview History
      </h2>

      {interviews.length === 0 ? (
        <div className="bg-white/5 border border-gray-800 rounded-3xl p-10 text-center text-gray-400">
          No interviews found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {interviews.map((item) => (
            <div
              key={item._id}
              className="bg-white/5 backdrop-blur-lg border border-gray-800 rounded-3xl p-6"
            >
              <h3 className="text-2xl font-bold">
                {item.role}
              </h3>

              <p className="text-gray-400 mt-3">
                Experience:
                {" "}
                {item.experience}
              </p>

              <p className="text-gray-400">
                Tech Stack:
                {" "}
                {item.techStack}
              </p>

              <p className="text-green-400 mt-3">
                Score:
                {" "}
                {item.score || "N/A"}
              </p>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => {
                    localStorage.setItem(
                      "interviewId",
                      item._id
                    );

                    localStorage.setItem(
                      "questions",
                      JSON.stringify(
                        item.questions
                      )
                    );

                    navigate(
                      "/voice-interview"
                    );
                  }}
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
                >
                  Start Interview
                </button>

                <button
                  onClick={() =>
                    navigate("/feedback")
                  }
                  className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg"
                >
                  View Report
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Dashboard;
