const express = require(`express`);
const router = express.Router();

//localhost:3000/triviaGame
router.get(`/`, (req, res) => {
  res.render(`triviaGame`, { title: "Trivia Game!" });
});

module.exports = router;
