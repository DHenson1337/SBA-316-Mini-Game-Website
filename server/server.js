//Load enviroment variable from .env
require(`../config/db.js`);
require(`dotenv`).config(); //Ensure dotenv is loaded

//Import dependencies
const express = require(`express`); // Express access
const axios = require(`axios`); //Axios access
const ejs = require(`ejs`); // ejs Engine access
const path = require("path"); // Allows my server to find files in other directories
const methodOverride = require("method-override"); // Include method-override

//Pulling Routes
const triviaRoutes = require("./routes/triviaGame.js");
const dumb1 = require("./routes/dumbRoute1.js");
const dumb2 = require("./routes/dumbRoute2.js");

const app = express(); //setting app to express (duh lel)

app.set("view engine", "ejs"); //Tells Express to use ejs view engine
app.set("views", path.join(__dirname, "views")); //Setting up views folder

// Middleware (The order really matters....)
app.use(express.static(path.join(__dirname, "../public"))); // Middleware for serving static files
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // For form data

const logRequestData = (req, res, next) => {
  console.log(
    `${req.method} request made to ${req.url} at ${new Date().toISOString()}`
  );
  next(); // Call next() to pass control to the next middleware/route handler
};

// Use the logging middleware globally for all routes
//What this Middleware does is
//1) : This function logs the HTTP request method (req.method), the request URL (req.url), and the current timestamp.
//2) app.use(logRequestData): This middleware is applied to every request that the server handles. You can add it globally or on specific routes.
//3) The next() function is important—it tells Express to pass the request to the next middleware or route handler.
app.use(logRequestData);

app.use(methodOverride("_method")); // Method-Override middleware must come after body parsers

//triviaHome Route (Route 1) Static Route

app.get("/triviaHome", (req, res) => {
  const categories = [
    {
      id: "custom",
      title: "Custom Questions",
      image: "../Images/triviaExpress/custom4.webp",
      description: "Test your wits with common knowledge trivia!",
    },
    {
      id: "9",
      title: "General Knowledge",
      image: "../Images/triviaExpress/general5.webp",
      description: "Test your wits with common knowledge trivia!",
    },
    {
      id: "31",
      title: "Anime & Manga",
      image: "../Images/triviaExpress/anime1.webp",
      description: "Dive into Japanese animation and manga trivia!",
    },
    {
      id: "27",
      title: "Animals",
      image: "../Images/triviaExpress/animals4.webp",
      description: "Trivia about animals of all kinds!",
    },
    {
      id: "32",
      title: "Cartoons & Animations",
      image: "../Images/triviaExpress/cartoons3.webp",
      description: "Explore the world of animated shows and movies!",
    },
    {
      id: "29",
      title: "Comics",
      image: "../Images/triviaExpress/comics2.webp",
      description:
        "Questions about your favorite comic characters and stories!",
    },
    {
      id: "11",
      title: "Films",
      image: "../Images/triviaExpress/movies1.webp",
      description: "Test your gaming knowledge with video game trivia!",
    },

    {
      id: "20",
      title: "Mythology",
      image: "../Images/triviaExpress/myth2.webp",
      description: "Explore the legends and myths of the world!",
    },
    {
      id: "23",
      title: "History",
      image: "../Images/triviaExpress/history1.webp",
      description: "Test your gaming knowledge with video game trivia!",
    },

    {
      id: "15",
      title: "Video Games",
      image: "../Images/triviaExpress/game3.webp",
      description: "Test your gaming knowledge with video game trivia!",
    },
  ];

  res.render("triviaHome", { categories }); // Pass the array to the template
});

// triviaGame Route
// console.log("Trivia routes are active");
app.use("/triviaGame", triviaRoutes);

// Route 2 dumb route
// localhost:3000/dumb
app.use("/dumb", dumb1);

//Route 3 dumb2 route
// localhost:3000/dumb2
app.use("/dumb2", dumb2);

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

//Use the port from .env or default to 3000
const port = process.env.PORT || 3000;

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

/* How I can test my custom routes in postman
For set PostMan Body to raw.
Then at the end set the Body to JSON (It's after binary, GraphQL its kinda hiddem) /rant >.> I blame ultrawide monitor, it was pretty annoying wondering why it wasn't working /end rant)

GET: http://localhost:3000/triviaGame/custom
POST: http://localhost:3000/triviaGame/custom
PATCH: http://localhost:3000/triviaGame/custom/:index
DELETE: 	http://localhost:3000/triviaGame/custom/:index


*/

//Probably shouldn't use this section for notes as well but...I told you to ignore it!
//Why are you reading it, there is no content here Sho Sho.

/* // Test Routes
app.post("/test", (req, res) => {
  res.send("POST route works!");
});

app.patch("/test", (req, res) => {
  res.send("PATCH route works!");
});

app.delete("/test", (req, res) => {
  res.send("DELETE route works!");
}); */
