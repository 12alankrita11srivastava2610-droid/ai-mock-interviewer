import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VoiceInterview() {
   const navigate = useNavigate();

  const questions =
    JSON.parse(localStorage.getItem("questions")) || [];

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [transcript, setTranscript] =
    useState("");

  const [answers, setAnswers] =
    useState([]);

  // 🎤 Voice Recording
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in this browser."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = (event) => {
      const text =
        event.results[0][0].transcript;

      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.log(event.error);
    };
  };

  // 🔊 Speak Question
  const speakQuestion = () => {
    const speech =
      new SpeechSynthesisUtterance(
        questions[currentQuestion]
      );

    window.speechSynthesis.speak(speech);
  };

  // 📤 Submit Interview
  const submitInterview = async (
    finalAnswers
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      const interviewId =
        localStorage.getItem(
          "interviewId"
        );

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/interview/submit`,
        {
          interviewId,
          answers: finalAnswers.map(
            (item) => item.answer
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
const user =
  JSON.parse(localStorage.getItem("user"));


localStorage.setItem(
  "feedback",
  JSON.stringify(res.data)
);

navigate("/feedback");
      console.log(res.data);
    } catch (error) {
      console.log(error);

      alert("Error submitting interview");
    }
  };

  // ➡ Next Question
  const nextQuestion = () => {
    const updatedAnswers = [
      ...answers,
      {
        question:
          questions[currentQuestion],
        answer: transcript,
      },
    ];

    setAnswers(updatedAnswers);

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );

      setTranscript("");
    } else {
      localStorage.setItem(
        "answers",
        JSON.stringify(updatedAnswers)
      );

      submitInterview(updatedAnswers);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">
          No Questions Found.
          <br />
          Generate Interview First.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-8">
        Voice Interview
      </h1>

      <div className="bg-white/10 p-8 rounded-xl w-full max-w-3xl">
        <div className="mb-4 text-gray-400">
          Question {currentQuestion + 1} of{" "}
          {questions.length}
        </div>

        <h2 className="text-2xl mb-6">
          {questions[currentQuestion]}
        </h2>

        <div className="flex gap-4 mb-6">
          <button
            onClick={speakQuestion}
            className="bg-green-600 px-6 py-3 rounded-lg"
          >
            🔊 Hear Question
          </button>

          <button
            onClick={startListening}
            className="bg-blue-600 px-6 py-3 rounded-lg"
          >
            🎤 Start Recording
          </button>
        </div>

        <div className="bg-black/30 p-4 rounded-lg">
          <h3 className="font-bold mb-2">
            Your Answer:
          </h3>

          <p>
            {transcript ||
              "Start recording to answer..."}
          </p>
        </div>

        <button
          onClick={nextQuestion}
          className="mt-6 bg-purple-600 px-6 py-3 rounded-lg"
        >
          {currentQuestion ===
          questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
        </button>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-3">
            Saved Answers
          </h3>

          {answers.map((item, index) => (
            <div
              key={index}
              className="mb-3 bg-black/20 p-3 rounded-lg"
            >
              <p>
                <strong>Q:</strong>{" "}
                {item.question}
              </p>

              <p>
                <strong>A:</strong>{" "}
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VoiceInterview;