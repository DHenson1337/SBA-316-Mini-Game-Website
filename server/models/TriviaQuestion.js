//Import the mongoose library to define and work with schemas
const mongoose = require(`mongoose`);

/* 
Defines the schema blueprint for trivia Questions
*/

const triviaQuestionSchema = new mongoose.Schema(
  {
    //The question field: The main question text
    question: {
      type: String, //Sets Data type to string
      required: true, // Sets the field to mandatory
      unique: true, // Prevents duplicate questions
    },
    // The `correct_answer` field: The correct answer to the question
    correct_answer: {
      type: String,
      required: true,
    },
    //The incorrect_answers' field: Array of wrong answers
    incorrect_answers: {
      type: [String], //Data type is an array of strings
      required: true, // This field is mandatory
      validate: {
        // Custom validation: Ensure there is at least one incorrect answer
        validator: (value) => value.length >= 1,
        message: `There must be at least one inccorect answer`,
      },
    },
  },
  {
    timestamps: true, //This automatically add `createdAt and  updatedAt` timeStamps
  }
);

//Add an index for the `question` field to optimize search queries
triviaQuestionSchema.index({ question: `text` });

//Create the model (a wrapper around the schema for interacting with the database)
const TriviaQuestion = mongoose.model(`TriviaQuestion`, triviaQuestionSchema);

//Export the model so it can be used in other parts of the project
module.exports = TriviaQuestion;
