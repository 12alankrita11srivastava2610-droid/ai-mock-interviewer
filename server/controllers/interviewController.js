require("dotenv").config();

const Interview = require("../models/Interview");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

console.log(
  "CONTROLLER KEY:",
  process.env.GEMINI_API_KEY
);

// =========================
// Generate Interview
// =========================
const createInterview = async (req, res) => {
  try {
    const { role, experience, techStack } = req.body;

    const prompt = `
Generate 10 professional interview questions.

Role: ${role}
Experience: ${experience}
Tech Stack: ${techStack}

Return ONLY a JSON array.

Example:
[
  "Question 1",
  "Question 2",
  "Question 3"
]
`;

    const result =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    let responseText = result.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let questions;

    try {
      questions = JSON.parse(responseText);
    } catch (err) {
      questions = responseText
        .split("\n")
        .filter((q) => q.trim());
    }

    const interview = await Interview.create({
      userId: req.user.id,
      role,
      experience,
      techStack,
      questions,
    });

    res.status(201).json(interview);
  } catch (error) {
    console.log(
      "Create Interview Error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Get Interviews
// =========================
const getInterviews = async (req, res) => {
  try {
    const interviews =
      await Interview.find({
        userId: req.user.id,
      }).sort({ createdAt: -1 });

    res.status(200).json(interviews);
  } catch (error) {
    console.log(
      "Get Interviews Error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// Submit Interview
// =========================
const submitInterview = async (req, res) => {
  try {
    const { interviewId, answers } = req.body;

    const interview = await Interview.findById(
      interviewId
    );

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const prompt = `
You are a senior technical interviewer.

Interview Role:
${interview.role}

Experience:
${interview.experience}

Tech Stack:
${interview.techStack}

Questions:
${interview.questions.join("\n")}

Candidate Answers:
${answers.join("\n")}

Analyze the candidate deeply.

Return ONLY valid JSON.

{
  "technicalScore": 8,
  "communicationScore": 7,
  "confidenceScore": 8,
  "overallScore": 8,
  "recommendation": "Hire",
  "strengths": [
    "Strong Java fundamentals",
    "Good problem solving",
    "Clear technical explanations"
  ],
  "weaknesses": [
    "Needs more real-world examples",
    "Can improve confidence"
  ],
  "feedback": "Detailed professional feedback of at least 100 words."
}
`;

    const result =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    let responseText =
      result.text || "";

    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log(
      "GEMINI RESPONSE:"
    );
    console.log(responseText);

    let evaluation;

    try {
      evaluation =
        JSON.parse(responseText);
    } catch (err) {
      console.log(
        "JSON Parse Error:",
        err
      );

      evaluation = {
        technicalScore: 5,
        communicationScore: 5,
        confidenceScore: 5,
        overallScore: 5,
        recommendation: "Consider",
        strengths: [
          "Attempted all questions",
        ],
        weaknesses: [
          "Need better answers",
        ],
        feedback:
          responseText,
      };
    }

    // Save Interview

    interview.answers = answers;

    interview.score =
      evaluation.overallScore;

    interview.feedback =
      evaluation.feedback;

    interview.strengths =
      evaluation.strengths;

    interview.weaknesses =
      evaluation.weaknesses;

    interview.recommendation =
      evaluation.recommendation;

    await interview.save();

    res.status(200).json({
      candidateName:
        req.user.name || "Candidate",

      role: interview.role,

      technicalScore:
        evaluation.technicalScore,

      communicationScore:
        evaluation.communicationScore,

      confidenceScore:
        evaluation.confidenceScore,

      overallScore:
        evaluation.overallScore,

      recommendation:
        evaluation.recommendation,

      strengths:
        evaluation.strengths,

      weaknesses:
        evaluation.weaknesses,

      feedback:
        evaluation.feedback,
    });

  } catch (error) {
    console.log(
      "SUBMIT ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createInterview,
  getInterviews,
  submitInterview,
};