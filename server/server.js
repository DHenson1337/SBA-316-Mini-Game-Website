const express = require(`express`); // Express access
const axios = require(`axios`); //Axios access
const ejs = require(`ejs`); // ejs Engine access
const path = require("path"); // Allows my server to find files in other directories

const app = express(); //setting app to express (duh lel)

//Pulling Routes
const triviaGame = require("./routes/triviaGame.js");
// const yangRouter = require("./routes/yang.js");
// const yoRouter = require("./routes/yo.js");

app.set(`views`, `views`); //Setting up views folder
app.set(`view engine`, ejs); //Tells Express to use ejs view engine
app.use(express.static(path.join(__dirname, "..", "public"))); //Targets my public folder with all my static files
app.use(express.urlencoded({ extended: true }));

// Dynamic route to get HTML pages under the public folder (Will probably become obsolete once we start React)
app.get(`/pages/:pageName`, (req, res) => {
  const pageName = req.params.pageName; // Variable to get page name from the URL
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "pages",
    `${pageName}.html`
  ); // Builds the path

  // Attempt to send the HTML file
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("Sorry, we lost the page :< "); // If the page isn't found
    }
  });
});

// triviaGame Route (Route 1)
app.use(`/triviaGame`, triviaGame); //localhost:3000/triviaGame

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is taking a leisurely jog");
});

// Add a 404 handler for undefined routes (Place this last)
app.use((req, res) => {
  res.status(404).send("Oops! That page doesn't exist.");
});

//==========================Ignore, Debugging stuff =====================
