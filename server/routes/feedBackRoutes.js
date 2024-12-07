////localhost:3000/triviaGame/feedback

const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

//(GET) Fetch all feedback
router.get("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ dateSubmitted: -1 });
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).send("Failed to fetch feedback.");
  }
});

//Post: Submit new feedback
router.post("/feedback", async (req, res) => {
  const { username, message } = req.body;
  try {
    const newFeedback = await Feedback.create({ username, message });
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).send("Failed to submit feedback.");
  }
});

module.exports = router;
