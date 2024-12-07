const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  username: { type: String }, // Optional: Name of the user providing feedback
  message: { type: String, required: true }, // Feedback message
  dateSubmitted: { type: Date, default: Date.now }, // Date the feedback was submitted
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
