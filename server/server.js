
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();

// CORS configuration for the deployed Vercel frontend
const allowedOrigins = [
  "https://ai-mock-interviewer-two-pi.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Middleware
app.use(express.json());

// Database connection
connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/interview", interviewRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("AI Mock Interviewer Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
