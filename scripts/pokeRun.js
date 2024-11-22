//Poke API
const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const missingNo =
  "https://static.wikia.nocookie.net/fantendo/images/8/88/MissingNo_RB.png/revision/latest?cb=20220908084550";

// Loads the video swapping elements on page load
document.addEventListener("DOMContentLoaded", () => {
  const toggleLight = document.getElementById("toggle-mode");
  const videoElement = document.querySelector(".background-clip");

  //Array of background video's
  const videoBackgrounds = [
    "../Images/backGrounds/stockNL1.webm",
    "../Images/backGrounds/stockNL2.webm",
  ];
  //Initial index for background swapper
  let currentIndex = 0;

  //Swaps background Video
  const toggleBackgroundVideo = () => {
    currentIndex = (currentIndex + 1) % videoBackgrounds.length; // Loops through Video's
    videoElement.src = videoBackgrounds[currentIndex];
    videoElement.load(); //Reload the video source
    videoElement.play(); //Play the new video
  };

  toggleLight.addEventListener("click", toggleBackgroundVideo);
});

//Get Pokemon by name
const fetchPokemonByName = async (pokeName) => {
  try {
    const response = await fetch(`${API_URL}${pokeName.toLowerCase()}`);
    if (!response.ok) throw new Error("Pokémon not found!");
    return await response.json();
  } catch {
    error;
  }
  {
    console.error(error.message);
    return null;
  }
};

//Get Pokemon by type
const fetchPokemonByType = async (type) => {
  try {
    const response = await fetch(`${API_URL}type/${type.toLowerCase()}`);
    if (!response.ok) throw new Error("Type not found!");
    const data = await response.json();
    return data.pokemon.map((entry) => entry.pokemon.name); // Lists the pokemon names when type is selected
  } catch {
    error;
  }
  {
    console.error(error.message);
    return [];
  }
};

//Shiny Pokemon function
const isShiny = () => Math.random() < 0.01;

const renderSprites = (pokemon) => {
  const spriteBox = document.querySelector(".spriteBox");
  spriteBox.innerHTML = ""; // cleans box after selection
};
