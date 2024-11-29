const express = require(`express`);
const router = express.Router();
const axios = require(`axios`); //Axios access

//localhost:3000/triviaGame
router.get(`/`, (req, res) => {
  res.render(`triviaGame`, { title: "Trivia Game!" });
});

//Setting the Parameters for the Quiz
router.post(`/`, async (req, res) => {
  const { amount, category, difficulty } = req.body;
  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
    );
    const questions = response.data.results;
    res.render(`trivia`, { questions });
  } catch (error) {
    console.error(
      "The real question is, why did we fail to get the trivia questions?",
      error
    );
    res
      .status(500)
      .send("Sorry, unable to 'fetch' the trivia questions. Please try again");
  }
});
module.exports = router;
