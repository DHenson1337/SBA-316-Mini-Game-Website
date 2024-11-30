const express = require(`express`); // Express access
const axios = require(`axios`); //Axios access
const ejs = require(`ejs`); // ejs Engine access
const path = require("path"); // Allows my server to find files in other directories

const app = express(); //setting app to express (duh lel)

//Pulling Routes
const triviaGame = require("./routes/triviaGame.js");
// const yangRouter = require("./routes/yang.js");
// const yoRouter = require("./routes/yo.js");

app.set("view engine", "ejs"); //Tells Express to use ejs view engine
app.set("views", path.join(__dirname, "views")); //Setting up views folder

// Middleware
app.use(express.static(path.join(__dirname, "../public"))); // Middleware for serving static files
app.use(express.urlencoded({ extended: true }));

const logRequestData = (req, res, next) => {
  console.log(
    `${req.method} request made to ${req.url} at ${new Date().toISOString()}`
  );
  next(); // Call next() to pass control to the next middleware/route handler
};

// Use the logging middleware globally for all routes
app.use(logRequestData);

//What this Middleware does is
//1) : This function logs the HTTP request method (req.method), the request URL (req.url), and the current timestamp.
//2) app.use(logRequestData): This middleware is applied to every request that the server handles. You can add it globally or on specific routes.
//3) The next() function is important—it tells Express to pass the request to the next middleware or route handler.

//triviaHome Route (Route 1) Static Route
app.get("/triviaHome", (req, res) => {
  const filePath = path.join(__dirname, "views", "triviaHome.ejs");
  console.log(`Attempting to render file: ${filePath}`);
  res.render("triviaHome");
});

// triviaGame Route (Route 2)
app.use("/triviaGame", triviaGame);

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is taking a leisurely jog through port:${PORT}`);
});

// Add a 404 handler for undefined routes (Place this last)
app.use((req, res) => {
  res.status(404).send("Oops! That page doesn't exist.");
});

//==========================Ignore, Debugging stuff =====================

//console.log("Views directory:", app.get("views")); - displays views location

// Debug to check file accessibility
/* const fs = require("fs");
const triviaHomePath = path.join(__dirname, "views", "triviaHome.ejs");
fs.access(triviaHomePath, fs.constants.R_OK, (err) => {
  if (err) {
    console.error("Cannot access triviaHome.ejs:", err.message);
  } else {
    console.log("triviaHome.ejs is accessible.");
  }
}); */

//Random Rant:
/* I can't believe I spent so many hours wondering why my ejs view wouldn't load
and the issue was that 'ejs' wasn't a string in my code.
Haha......am going to eat breakfeast now. */

/* Syntax that am still confused on
Use <% %> for logic (like loops, conditionals, or variable declarations).
Use <%= %> for outputting dynamic content to the HTML.
Use <%- %> for raw HTML that doesn’t need escaping.
Use <%# %> for comments. 

*/

//Probably shouldn't use this section for notes as well but...I told you to ignore it!
//Why are you reading it, there is no content here Sho Sho.
