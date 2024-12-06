/* (Routes for Custom)
(GET) http://localhost:3000/triviaGame/trivia-questions
(POST) http://localhost:3000/triviaGame/trivia-questions
(PATCH)http://localhost:3000/triviaGame/trivia-questions/<id>


Manage custom Trivia Questions
http://localhost:3000/triviaGame/manage*/
const TriviaQuestion = require(`../models/TriviaQuestion`);
const express = require(`express`);
const router = express.Router();
const mongoose = require(`mongoose`); // Import mongoose to use ObjectID (and hopefully fix Patch and Delete)
const axios = require(`axios`); //Axios access
const {
  getAllCustomQuestions,
  addCustomQuestion,
  updateCustomQuestion,
  deleteCustomQuestion,
} = require("../../data/customQuestions"); // Import custom questions

//Test route to check TriviaQuestion model
//localhost:3000/trivia/test-trivia-model
/* router.get(`/test-trivia-model`, async (req, res) => {
  try {
    // This logs the model to ensure it is properly imported
    console.log(TriviaQuestion);

    //Send a Success message to the client (me)
    res.json({ message: `TriviaQuestion model is working` });
  } catch (err) {
    res.status(500).json({
      message: `Error testing TriviaQuestion model`,
      error: err.message,
    });
  }
}); */

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

// (GET) Route to display manage trivia questions page
router.get(`/manage`, async (req, res) => {
  const searchQuery = req.query.q; //Check if there's a search query
  let triviaQuestions = [];
  let searchResults = [];

  try {
    if (searchQuery) {
      searchResults = await TriviaQuestion.find({
        $text: { $search: searchQuery },
      }); // Fetch search results
    } else {
      triviaQuestions = await TriviaQuestion.find(); //Gets all the questions
    }
    res.render(`manageTriviaQuestions`, {
      triviaQuestions,
      searchResults,
    });
  } catch (err) {
    console.error(`Error loading manage page:`, err);
    res.status(500).send(`Error loading manage page`);
  }
});

// (GET) Search Trivia questions
router.get(`/manage`, async (req, res) => {
  const searchQuery = req.query.q || ""; // Default to an empty string if no search query
  let triviaQuestions = [];
  let searchResults = [];

  try {
    if (searchQuery) {
      console.log(`Search query: ${searchQuery}`);
      searchResults = await TriviaQuestion.find({
        $text: { $search: searchQuery },
      }); // Perform a text search
    } else {
      triviaQuestions = await TriviaQuestion.find(); // Fetch all questions
    }

    // Debugging: Log what is being passed to the template
    console.log(`Trivia Questions:`, triviaQuestions);
    console.log(`Search Results:`, searchResults);

    res.render(`manageTriviaQuestions`, {
      triviaQuestions,
      searchResults,
    });
  } catch (err) {
    console.error(`Error loading manage page:`, err);
    res.status(500).send(`Error loading manage page`);
  }
});

// (GET) Route for getting all the trivia questions
router.get(`/trivia-questions`, async (req, res) => {
  try {
    const questions = await TriviaQuestion.find(); //Fetches all questions from MongoDB
    res.json(questions); // Return as JSON
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error fetching trivia questions`, error: err.message });
  }
});

// (POST) post a trivia question
router.post(`/trivia-questions`, async (req, res) => {
  const { question, correct_answer, incorrect_answers } = req.body;

  //Ensure incorrect_answers is an array; convert it if necessary
  const formattedIncorrectAnswers = Array.isArray(incorrect_answers) // Check if it's already an array
    ? incorrect_answers
    : incorrect_answers.split(`,`).map((ans) => ans.trim()); //Converts to string array if needed

  const newQuestion = new TriviaQuestion({
    question,
    correct_answer,
    incorrect_answers: formattedIncorrectAnswers, // Use the formatted array for the check
  });

  try {
    const savedQuestion = await newQuestion.save(); // Save to MongoSB
    res.redirect(`/triviaGame/manage`); //redirect to the manage page
  } catch (err) {
    res
      .status(400)
      .json({ message: `Error adding trivia question`, error: err.message });
  }
});

//(PATCH) Update a trivia question
router.patch(`/trivia-questions/:id`, async (req, res) => {
  console.log("PATCH route triggered"); // Debugging
  console.log("ID received:", req.params.id); // Log the ID received
  console.log("Body received:", req.body); // Log the body
  try {
    const updatedQuestion = await TriviaQuestion.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id), //Casst to ObjectId
      // req.param.id, //Find by MongoDB ObjectId
      req.body, // Applies the updates
      { new: true, runValidators: true } // Return updated doc and apply schema validation
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: `Trivia question not found` });
    }
    res.redirect(`/triviaGame/manage?status=updated`); // redirect to manage page
  } catch (err) {
    res
      .status(400)
      .json({ message: `Error updating trivia question`, error: err.message });
  }
});

router.delete(`/trivia-questions/:id`, async (req, res) => {
  console.log(`Delete route reached`); //Debugging the delete route again >.>
  console.log("DELETE ID:", req.params.id); // debugging
  try {
    const deletedQuestion = await TriviaQuestion.findByIdAndDelete(
      mongoose.Types.ObjectId(req.params.id) //Cast to ObjectID
      // req.params.id
    ); //Find and delete by ObjectID
    if (!deletedQuestion) {
      return res.status(404).json({ message: `Trivia question not found` });
    }
    res.redirect(`/triviaGame/manage`); //Redirect to manage page
  } catch (err) {
    res
      .status(500)
      .json({ message: `Error deleting trivia question`, error: err.message });
  }
});

//=====================Old Routes b4 MongoDB ======================

/* GET: http://localhost:3000/triviaGame/custom
 POST: http://localhost:3000/triviaGame/custom
PATCH: http://localhost:3000/triviaGame/custom/0 (for index 0)
DELETE: http://localhost:3000/triviaGame/custom/0 (for index 0)  */

// Route to get all custom questions (GET) (OLD)
/* router.get("/custom", (req, res) => {
  const customQuestions = getAllCustomQuestions(); // Get all custom questions
  res.status(200).json(customQuestions); // Return custom questions as JSON
}); */

// Custom Post Route (POST) (OLD)
/* router.post("/custom", (req, res) => {
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
}); */

/* // Update a custom question (PATCH)
router.patch("/custom/:index", (req, res) => {
  console.log("PATCH request received:", req.params.index, req.body);

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
    console.error("Invalid input or index:", req.body);
    return res.status(400).send("Invalid input or index.");
  }

  try {
    updateCustomQuestion(index, {
      question,
      correct_answer,
      incorrect_answers: incorrectAnswersArray,
    });
    console.log("Question updated successfully");
    res.redirect("/triviaGame/manage?status=updated");
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).send("Failed to update question.");
  }
}); */

/* // Delete a custom question (DELETE) (OLD)
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
}); */

//Old get route to manage trivia questions
/* router.get("/manage", (req, res) => {
  const customQuestions = getAllCustomQuestions();
  res.render("manageTriviaQuestions", {
    customQuestions: customQuestions,
    query: req.query, // Pass req.query to the template
  });
}); */

module.exports = router;
