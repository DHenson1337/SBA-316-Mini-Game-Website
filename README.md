(For SBA: 319 Start from 3D)

SBA-316-Mini-Game-Website 🎮
Welcome to SBA-316-Mini-Game-Website!
This project is a collection of interactive mini-games built with HTML, CSS, JavaScript, and Express.

🚀 Live Demo: http://localhost:3000/ (Actual Url Coming Soon)
🛠 To get started:

Navigate to the server directory
Run nodemon server.js in the console to start the server
Games 🎮

1. PunI-shment Mountain ⛰️
   Climb the mountain, survive the puns!

   A text-based adventure game that's packed with puns, cringey humor, and some unexpected twists. Whether you're a pun enthusiast or just someone who loves to groan at bad wordplay, this game will surely put a smile on your face. (Don't worry, you know who you are... secret pun lovers 😉)

2. PokeManz 🐾
   Catch 'em all, but with a twist!

   PokeManz is a nostalgic throwback featuring iconic Pokémon characters — but with customizable sprites pulled straight from the Pokémon API! Select your favorite Pokémon, play a variety of mini-games, and relive those childhood memories.

3. Trivia Express! 🧠 🚅 (Far from Complete alot of TLC needed)
   Test your knowledge in this trivia game, powered by Express and rendered with the EJS engine. Play a quick round or browse through trivia topics in a simple, yet fun blog-like interface. Who said learning can't be fun?

3.A This is the current SBA so the read me will contain more details:
The game can be found on http://localhost:3000/triviaHome

(All four can be found at http://localhost:3000/triviaGame/manage)
GET:
POST:
PATCH:
DELETE:

3.B My custom middleware (const logRequestData )
Has been very helpful for tracking each request as well as confirming my routes are correct.
Had to also include (methodOverride to allow PATCH & DELETE methods through POST)

3.C Extra routes for query parameters
// localhost:3000/dumb
//http://localhost:3000/dumb?icecream=Vanilla
//http://localhost:3000/dumb?size=tiny

3.D The main page http://localhost:3000/triviaHome
3.E Seed the Data:
3.F Create Indexes: node public/scripts/triviaGameInitIndexes.js
3.G The routes revised. (But you can test them all under)
http://localhost:3000/triviaGame/manage
TriviaGame Routes
(GET) http://localhost:3000/triviaGame/trivia-questions
(POST) http://localhost:3000/triviaGame/trivia-questions
(PATCH)http://localhost:3000/triviaGame/trivia-questions/<id>
(DELETE)http://localhost:3000/triviaGame/trivia-questions/<id>

4. Newsletter ✉️
   This section is my attempt at form validation (spoiler: it's not about me needing validation... but I wouldn't say no to a little praise 😊). This feature is part of my project requirements, but hey, if you want to give me some positive feedback, feel free to! 💌

5. Game Pending... ⏳
   Coming soon! Keep an eye out for this one, as more games are on the horizon.

🚧 Upcoming Features 🚧
PunI-shment Mountain:
Add asynchronous typing effects for a more immersive experience. (Tried this before... but didn't quite nail it. Next time, for sure! 😅)
Expand the storyline with more branching paths and choices.

PokeManz:
Refine the search function for Pokémon with multiple forms (because sometimes they're more than one form, right?).
Add a loading spinner to indicate search status (still working on the perfect loading indicator).
Improve sprite scaling and collision detection.
Mobile-friendly adjustments for various screen sizes.

Future Updates 🔮
ReactJS integration! I plan to refactor the entire project to make it compatible with React, so expect a fresh new look and smoother performance.
🛠 Technologies Used:
HTML
CSS
JavaScript
Express
EJS (for dynamic views)
Pokémon API (for PokeManz)

Contribute 📝
If you have suggestions or want to add more games, features, or improvements, feel free to open an issue or submit a pull request. Contributions are welcome! 🚀

Thanks for checking out the SBA-316-Mini-Game-Website! Have fun playing, and don't forget to leave a pun or two in the comments. 😉
