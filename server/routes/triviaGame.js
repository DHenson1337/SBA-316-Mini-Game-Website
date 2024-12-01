/* (Routes for Custom)
GET: http://localhost:3000/triviaGame/custom
 POST: http://localhost:3000/triviaGame/custom
PATCH: http://localhost:3000/triviaGame/custom/0 (for index 0)
DELETE: http://localhost:3000/triviaGame/custom/0 (for index 0) 

Manage custom Trivia Questions
http://localhost:3000/triviaGame/manage*/

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
//====================GET, POST, PATCH, DELETE routes for custom questions========================
//localhost:3000/triviaGame/manage

// Route to display manage trivia questions page (GET)
router.get("/manage", (req, res) => {
  const customQuestions = getAllCustomQuestions();
  res.render("manageTriviaQuestions", {
    customQuestions: customQuestions,
    query: req.query, // Pass req.query to the template
  });
});
// Route to get all custom questions (GET)
router.get("/custom", (req, res) => {
  const customQuestions = getAllCustomQuestions(); // Get all custom questions
  res.status(200).json(customQuestions); // Return custom questions as JSON
});

// Custom Post Route (POST)
router.post("/custom", (req, res) => {
  const { question, correct_answer, incorrect_answers } = req.body;

  // Ensure incorrect_answers is treated as an array
  const incorrectAnswersArray = incorrect_answers
    .split(",")
    .map((ans) => ans.trim());

  if (question && correct_answer && incorrectAnswersArray.length > 0) {
    addCustomQuestion({
      question,
      correct_answer,
      incorrect_answers: incorrectAnswersArray, // Use the array
    });
    res.redirect("/triviaGame/manage"); // Redirect to manage page after adding
  } else {
    res.status(400).json({ message: "Invalid input." });
  }
});

// Update a custom question (PATCH)
router.patch("/custom/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);
  const { question, correct_answer, incorrect_answers } = req.body;

  const incorrectAnswersArray = incorrect_answers
    .split(",")
    .map((ans) => ans.trim());

  if (
    Number.isNaN(index) ||
    !question ||
    !correct_answer ||
    incorrectAnswersArray.length === 0
  ) {
    return res.status(400).send("Invalid input or index.");
  }

  try {
    // Update the question in the backend
    updateCustomQuestion(index, {
      question,
      correct_answer,
      incorrect_answers: incorrectAnswersArray,
    });

    res.redirect("/triviaGame/manage?status=updated"); // Redirect to the manage page
  } catch (err) {
    res.status(500).send("Failed to update question.");
  }
});

// Delete a custom question (DELETE)
router.delete("/custom/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);

  console.log("DELETE Request: ", { index });

  if (Number.isNaN(index)) {
    console.error("Invalid index:", req.params.index);
    return res.status(400).send("Invalid index.");
  }

  try {
    deleteCustomQuestion(index);
    res.redirect("/triviaGame/manage"); // Redirect back to the manage page
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).send("Failed to delete question.");
  }
});
module.exports = router;
