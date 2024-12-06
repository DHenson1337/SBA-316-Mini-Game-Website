const mongoose = require(`mongoose`);
require(`dotenv`).config();

const uri = process.env.MONGODB_URI; // Use the MongoDB URI from .env

mongoose.connect(uri);

const db = mongoose.connection;

db.on(`error`, console.error.bind(console, `Connection error:`));
db.once(`open`, () => {
  console.log(`Connected to MongoDB`);
});

module.exports = db;
