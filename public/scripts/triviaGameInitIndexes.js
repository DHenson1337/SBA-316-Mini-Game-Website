//For creating indexes in the TriviaGame DataBase

require("dotenv").config();

const mongoose = require("mongoose");
const TriviaQuestion = require("../../server/models/TriviaQuestion");

const createIndexes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB successfully.");

    await TriviaQuestion.createIndexes({ question: "text" });
    console.log('Text index on "question" field created successfully.');

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("Error while creating indexes:", error);
    process.exit(1);
  }
};

createIndexes();
