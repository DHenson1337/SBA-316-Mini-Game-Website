const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Username of the player
  score: { type: Number, required: true }, // Player's high score
  dateAchieved: { type: Date, default: Date.now }, // Date of the high score
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

module.exports = Leaderboard;
