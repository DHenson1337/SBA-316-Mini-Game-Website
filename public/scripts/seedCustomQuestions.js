require("dotenv").config();
const mongoose = require("mongoose");
const TriviaQuestion = require("../../server/models/TriviaQuestion");
const customQuestions = require("../../data/customQuestions");

const seedDatabase = async () => {
  try {
    //Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    //Insert custom question
    await TriviaQuestion.insertMany(customQuestions);
    console.log("Custom questions seeded successfully");

    //Disconnect after seeding
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
