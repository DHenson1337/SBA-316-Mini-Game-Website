// Custom Questions Array for the trivia Game
let customQuestions = [
  {
    question: "What is the capital of France?",
    correct_answer: "Paris",
    incorrect_answers: ["London", "Berlin", "Madrid"],
  },
  {
    question: "Who painted the Mona Lisa?",
    correct_answer: "Leonardo da Vinci",
    incorrect_answers: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
  },
];

// Functions for managing the questions

const getAllCustomQuestions = () => customQuestions;

//Put route
const addCustomQuestion = (newQuestion) => {
  customQuestions.push(newQuestion);
};
//Patch route
const updateCustomQuestion = (index, updatedQuestion) => {
  if (customQuestions[index]) {
    customQuestions[index] = updatedQuestion;
  }
};

//Delete route
const deleteCustomQuestion = (index) => {
  if (customQuestions[index]) {
    customQuestions.splice(index, 1);
  }
};

module.exports = {
  getAllCustomQuestions,
  addCustomQuestion,
  updateCustomQuestion,
  deleteCustomQuestion,
};
