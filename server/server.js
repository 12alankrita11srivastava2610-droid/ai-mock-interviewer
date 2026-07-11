const dotenv = require("dotenv");
const interviewRoutes = require("./routes/interviewRoutes");
const testRoutes = require("./routes/testRoutes");
const express = require("express");
const cors = require("cors");


const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");


dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

app.use("/api/interview", interviewRoutes);

app.get("/", (req, res) => {
  res.send("AI Mock Interviewer Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
dotenv.config();

console.log(
  "GEMINI KEY LOADED:",
  process.env.GEMINI_API_KEY
);