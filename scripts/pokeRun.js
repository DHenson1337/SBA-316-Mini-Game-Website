//Poke API
const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const TYPE_URL = "https://pokeapi.co/api/v2/type/";
const GENERATION_URL = "https://pokeapi.co/api/v2/generation/";
const missingNo = "../Images/PokeMon imgs/MissingNo_RB.webp";

// Loads the video swapping elements on page load
document.addEventListener("DOMContentLoaded", () => {
  const toggleLight = document.getElementById("toggle-mode");
  const videoElement = document.querySelector(".background-clip");

  //Array of background video's
  const videoBackgrounds = [
    "../Images/PokeMon imgs/starter2.mp4",
    "../Images/PokeMon imgs/starter1.mp4",
    "../Images/PokeMon imgs/starter3.mp4",
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
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

//Get Pokemon by type
const fetchPokemonByType = async (type) => {
  try {
    const response = await fetch(`${TYPE_URL}${type.toLowerCase()}`);
    if (!response.ok) throw new Error("Type not found!");
    const data = await response.json();
    return data.pokemon.map((entry) => entry.pokemon.name); // Lists the pokemon names when type is selected
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

//Get Pokemon by generation
const fetchPokemonByGeneration = async (gen) => {
  try {
    const response = await fetch(`${GENERATION_URL}${gen}`);
    if (!response.ok) throw new Error("Generation not found");
    const data = await response.json();
    return data.pokemon_species.map((species) => species.name);
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

//Shiny Pokemon function
const isShiny = () => Math.random() < 0.01;

//The missingNo function
const renderFallback = () => {
  const spriteBox = document.querySelector(".spriteBox");
  const img = document.createElement("img");
  img.src = missingNo;
  img.alt = "MissingNo.";
  spriteBox.appendChild(img);
};

//renders sprites in the spriteBox
const renderSprites = async (pokeNames) => {
  const spriteBox = document.querySelector(".spriteBox");
  spriteBox.innerHTML = ""; // Clear the box

  if (pokeNames.length > 0) {
    for (const pokeName of pokeNames) {
      const pokemon = await fetchPokemonByName(pokeName);

      if (pokemon) {
        // Create a container for each Pokémon
        const pokeContainer = document.createElement("div");
        pokeContainer.classList.add("pokemon-container");

        // Name above the sprite
        const nameElement = document.createElement("h3");
        nameElement.textContent = pokemon.name.toUpperCase();
        nameElement.classList.add("pokemon-name");

        // Sprite image
        const img = document.createElement("img");
        img.src = isShiny()
          ? pokemon.sprites.front_shiny
          : pokemon.sprites.front_default;
        img.alt = pokemon.name;
        img.classList.add("pokemon-sprite");

        // Type below the sprite
        const typeElement = document.createElement("p");
        typeElement.textContent = `Type: ${pokemon.types
          .map((type) => type.type.name)
          .join(", ")}`;
        typeElement.classList.add("pokemon-type");

        // Append elements to container
        pokeContainer.appendChild(nameElement);
        pokeContainer.appendChild(img);
        pokeContainer.appendChild(typeElement);

        // Append container to the sprite box
        spriteBox.appendChild(pokeContainer);
      } else {
        renderFallback();
      }
    }
  } else {
    renderFallback();
  }
};

// Enable search by type and element

const getIntersection = (arr1, arr2) => {
  const set1 = new Set(arr1);
  return arr2.filter((item) => set1.has(item));
};

//Button Event listener
document.querySelector(".pokeButton").addEventListener("click", async () => {
  const nameInput = document.querySelector(".pokeName").value.trim();
  const typeInput = document.querySelector(".pokeType").value.trim();
  const genInput = document.querySelector(".pokeGen").value.trim();

  let pokemonNames = [];

  if (nameInput) {
    // Get by name
    const pokemon = await fetchPokemonByName(nameInput);
    if (pokemon) pokemonNames.push(pokemon.name);
  } else if (typeInput && genInput) {
    // Get by type and generation
    const typePokemon = await fetchPokemonByType(typeInput);
    const genPokemon = await fetchPokemonByGeneration(genInput);
    pokemonNames = getIntersection(typePokemon, genPokemon);
  } else if (typeInput) {
    // Get by type only
    pokemonNames = await fetchPokemonByType(typeInput);
  } else if (genInput) {
    // Get by generation only
    pokemonNames = await fetchPokemonByGeneration(genInput);
  } else {
    alert("It's dangerous to go alone, take this （╯°□°）╯︵◓");
    return;
  }
  renderSprites(pokemonNames);
});
