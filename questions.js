const express = require("express");
const jwt = require("jsonwebtoken");
const Question = require("../models/Question");
const User = require("../models/User");
const router = express.Router();

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("user", "username")
      .populate("answers.user", "username")
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a new question
router.post("/", authMiddleware, async (req, res) => {
  try {
    const question = new Question({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      user: req.userId
    });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post an answer
router.post("/:id/answer", authMiddleware, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    question.answers.push({
      text: req.body.text,
      user: req.userId
    });
    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Vote answer (upvote/downvote)
router.put("/:qId/answer/:aId/vote", authMiddleware, async (req, res) => {
  const { type } = req.body; // "up" or "down"
  try {
    const question = await Question.findById(req.params.qId);
    const answer = question.answers.id(req.params.aId);
    answer.votes += (type === "up" ? 1 : -1);
    await question.save();
    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Accept answer
router.patch("/:qId/answer/:aId/accept", authMiddleware, async (req, res) => {
  try {
    const question = await Question.findById(req.params.qId);
    if (question.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Only owner can accept" });
    }
    question.answers.forEach(ans => {
      ans.accepted = (ans.id === req.params.aId);
    });
    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
