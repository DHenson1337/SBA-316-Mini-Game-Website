const express = require(`express`);
const router = express.Router();
const axios = require(`axios`); //Axios access
const {
  getAllCustomQuestions,
  addCustomQuestion,
  updateCustomQuestion,
  deleteCustomQuestion,
} = require("../../data/customQuestions"); // Import custom questions

//localhost:3000/triviaGame
// Route for GET request to /triviaGame
router.get("/", (req, res) => {
  res.render("triviaGame", { title: "Trivia Game!" });
});

// Route for POST request to /triviaGame (setting up the quiz)
router.post("/", async (req, res) => {
  const { amount, category, difficulty } = req.body;

  let questions;

  try {
    if (category === "custom") {
      questions = getAllCustomQuestions().slice(0, amount); // Select 'amount' custom questions
    } else {
      // Fetch questions from Open Trivia Database API
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
      );
      questions = response.data.results; // Set the API results as questions
    }

    // Render the triviaGame view, passing both API questions and custom questions
    res.render("triviaGame", {
      questions,
      customQuestions: getAllCustomQuestions(), // Make sure to pass customQuestions
    });
  } catch (error) {
    console.error("Failed to fetch trivia questions:", error);
    res
      .status(500)
      .send("Sorry, unable to fetch trivia questions. Please try again.");
  }
});
// Custom Post Route (POST)
router.post("/custom", (req, res) => {
  const { question, correct_answer, incorrect_answers } = req.body;

  if (question && correct_answer && incorrect_answers) {
    customQuestions.addCustomQuestion({
      question,
      correct_answer,
      incorrect_answers,
    });
    res.status(201).json({ message: "Custom question added!" });
  } else {
    res.status(400).json({
      message:
        "Invalid input. Question, correct_answer, and incorrect_answers are required.",
    });
  }
});

// Update a custom question (PATCH)
router.patch("/custom/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const { question, correct_answer, incorrect_answers } = req.body;

  if (index >= 0 && question && correct_answer && incorrect_answers) {
    customQuestions.updateCustomQuestion(index, {
      question,
      correct_answer,
      incorrect_answers,
    });
    res.status(200).json({ message: "Custom question updated!" });
  } else {
    res.status(400).json({ message: "Invalid input or index." });
  }
});

// Delete a custom question (DELETE)
router.delete("/custom/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (index >= 0) {
    customQuestions.deleteCustomQuestion(index);
    res.status(200).json({ message: "Custom question deleted!" });
  } else {
    res.status(400).json({ message: "Invalid index." });
  }
});

module.exports = router;
