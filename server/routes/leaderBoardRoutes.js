//localhost:3000/triviaGame/leaderboard

const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/Leaderboard");

//(GET) Get's top 10 Scores
// GET: Fetch top 10 scores
router.get(`/leaderboard`, async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10); // Fix the typo here
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(`Error fetching leaderboard:`, error);
    res.status(500).send("Failed to fetch leaderboard");
  }
});

router.post("/leaderboard", async (req, res) => {
  const { username, score } = req.body;
  try {
    const newScore = await Leaderboard.create({ username, score });
    res.status(201).json(newScore);
  } catch (error) {
    console.error("Error adding leaderboard score:", error);
    res.status(500).send("Failed to add leaderboard Score");
  }
});

module.exports = router;
