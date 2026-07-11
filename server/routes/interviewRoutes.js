const express = require("express");
const router = express.Router();

const {
  createInterview,
  getInterviews,
  submitInterview,
} = require("../controllers/interviewController");

const { protect } = require("../middleware/authMiddleware");

// Generate interview questions
router.post("/generate", protect, createInterview);

// Get all interviews
router.get("/all", protect, getInterviews);

// Submit interview answers
router.post("/submit", protect, submitInterview);

module.exports = router;