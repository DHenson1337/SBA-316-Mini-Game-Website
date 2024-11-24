//Poke API
const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const TYPE_URL = "https://pokeapi.co/api/v2/type/";
const GENERATION_URL = "https://pokeapi.co/api/v2/generation/";
const missingNo = "../Images/PokeMon imgs/MissingNo_RB.webp";

const character = document.getElementById("character");
const block = document.getElementById("block");
const main = document.querySelector(".main");
const title = document.querySelector(".title");
const gameStartButton = document.getElementById("gameStart");
const characterContainer = document.getElementById("character-container");

//#region  Video Backgrounds
// Loads the video swapping elements on page load
document.addEventListener("DOMContentLoaded", () => {
  const toggleLight = document.getElementById("toggle-mode");
  const videoElement = document.querySelector(".background-clip");

  //Array of background video's
  const videoBackgrounds = [
    "../Images/PokeMon imgs/umbreon-under-the-moonlight.1920x1080.mp4",
    "../Images/PokeMon imgs/pokemon-umbreon-at-night.1920x1080.mp4",
    "../Images/PokeMon imgs/pokeball-house.1920x1080.mp4",
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

//#endregion

//#region Pokemon Card Getter
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
  spriteBox.innerHTML = "";
  const img = document.createElement("img");
  img.src = missingNo;
  img.alt = "MissingNo.";
  spriteBox.appendChild(img);
};

//renders  sorted sprites in the spriteBox
const renderSortedSprites = async (pokeNames) => {
  const spriteBox = document.querySelector(".spriteBox");
  spriteBox.innerHTML = ""; // Clear the box

  const sortedPokemon = await fetchPokemonDetails(pokeNames);

  if (sortedPokemon.length > 0) {
    sortedPokemon.forEach((pokemon) => {
      // Create a container for each Pokémon
      const pokeContainer = document.createElement("div");
      pokeContainer.classList.add("pokemon-container");

      // Name above the sprite
      const nameElement = document.createElement("h3");
      nameElement.textContent = `${pokemon.name.toUpperCase()} (#${
        pokemon.id
      })`;
      nameElement.classList.add("pokemon-name");

      // Sprite image
      const img = document.createElement("img");
      img.src = pokemon.sprite || missingNo;
      img.alt = pokemon.name;
      img.classList.add("pokemon-sprite");

      //Double Click Event to add sprite to games
      img.addEventListener("dblclick", () => {
        character.src = pokemon.backSprite || missingNo;
      });

      // Type below the sprite
      const typeElement = document.createElement("p");
      typeElement.textContent = `Type: ${pokemon.types.join(", ")}`;
      typeElement.classList.add("pokemon-type");

      // Append elements to container
      pokeContainer.appendChild(nameElement);
      pokeContainer.appendChild(img);
      pokeContainer.appendChild(typeElement);

      // Append container to the sprite box
      spriteBox.appendChild(pokeContainer);
    });
  } else {
    renderFallback();
  }
};

// Enable search by type and element
const getIntersection = (arr1, arr2) => {
  const set1 = new Set(arr1);
  return arr2.filter((item) => set1.has(item));
};

//The ultimate sort and missing pokemon function (#return Mimikyu)
const fetchPokemonDetails = async (pokeNames) => {
  const sortedPokemon = [];

  for (const name of pokeNames) {
    try {
      const pokemon = await fetchPokemonByName(name);
      if (pokemon) {
        const sprite =
          pokemon.name === "mimikyu"
            ? pokemon.sprites.front_default // Use the disguised form
            : isShiny()
            ? pokemon.sprites.front_shiny
            : pokemon.sprites.front_default;

        const backSprite =
          pokemon.name === "mimikyu"
            ? pokemon.sprites.back_default
            : isShiny()
            ? pokemon.sprites.back_shiny
            : pokemon.sprites.back_default;

        sortedPokemon.push({
          id: pokemon.id,
          name: pokemon.name.replace(/-.*$/, ""), // Removes anything after a "-"
          types: pokemon.types.map((type) => type.type.name),
          sprite: sprite,
          backSprite: backSprite,
        });
      } else {
        console.warn(`Could not fetch details for Pokemon: ${name}`);
      }
    } catch (error) {
      console.error(`Team Rocket stole ${name}: ${error.message}`);
    }
  }

  // Sorts Pokémon by ID
  sortedPokemon.sort((a, b) => a.id - b.id);
  return sortedPokemon;
};

//Button Event listener
document.querySelector(".pokeButton").addEventListener("click", async () => {
  const nameInput = document.querySelector(".pokeName").value.trim();
  const typeInput = document.querySelector(".pokeType").value.trim();
  const genInput = document.querySelector(".pokeGen").value.trim();

  let pokemonNames = [];

  // Fetch by name
  if (nameInput) {
    const pokemon = await fetchPokemonByName(nameInput);
    if (pokemon) {
      pokemonNames.push(pokemon.name);
    }
  }

  // Fetch by type and/or generation
  if (typeInput || genInput) {
    const typePokemon = typeInput ? await fetchPokemonByType(typeInput) : [];
    const genPokemon = genInput ? await fetchPokemonByGeneration(genInput) : [];

    if (typeInput && genInput) {
      // If both type and generation are provided, get the intersection
      pokemonNames = getIntersection(
        pokemonNames.length ? pokemonNames : typePokemon,
        genPokemon
      );
    } else {
      // Use the fetched names directly if only one filter is provided
      pokemonNames = [
        ...(pokemonNames.length ? pokemonNames : []),
        ...(typePokemon.length ? typePokemon : genPokemon),
      ];
    }
  }

  //  MissingNo fallback
  if (!pokemonNames.length) {
    renderFallback();
    return;
  }

  // Render valid Pokémon
  renderSortedSprites([...new Set(pokemonNames)]); // Remove duplicates, if any
});

//#endregion

//#region Poke-Run Game

//Sets the game status
let gameStarted = false;

gameStartButton.addEventListener("click", () => {
  if (!gameStarted) {
    startGame();
    gameStarted = true;
    gameStartButton.textContent = "Restart Game?";
  } else {
    resetGame();
    gameStartButton.textContent = "Start Game";
  }
});

//Starts the game
function startGame() {
  title.textContent = "Poké Run";

  //Reset Positions
  characterContainer.style.top = "150px";
  characterContainer.style.left = "50px";
  block.style.left = "480px";

  // Restart animation
  block.style.animation = "block 1s infinite linear";
  block.style.display = "block";

  //Enable Collision detection
  checkCollisionInterval = setInterval(checkCollision, 10);
}

// Resets the game:
function resetGame() {
  characterContainer.style.top = "150px";
  characterContainer.style.left = "50px";
  block.style.left = "480px";

  // Reset the blocks animation
  block.style.animation = "none";
  block.offsetHeight;
  block.style.animation = "block 1s infinite linear";

  //Hide block and reset title when game starts
  block.style.display = "none";
  title.textContent = "Poké Run";

  //Stop the collision detection
  clearInterval(checkCollisionInterval);
  gameStarted = false; //Sets the game to inactive, like the start
}

//Jumping Function for our character
function jump() {
  if (!character.classList.contains("animate")) {
    character.classList.add("animate");
  }
}

// Remove the "animate" class after the animation ends
character.addEventListener("animationend", () => {
  character.classList.remove("animate");
});

main.addEventListener("click", jump);

// Collision detection function
const checkCollision = () => {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
    block.style.animation = "none";
    block.style.display = "none";
    title.textContent = "Loser!";
    clearInterval(checkCollisionInterval); // Stop the game if character hits the block
  }
};
//#endregion

//#region  Old Game Logic
/* //Jumping Function for our character
function jump() {
  character.classList.toggle("animate");
}

// Remove the "animate" class after the animation ends
character.addEventListener("animationend", () => {
  character.classList.remove("animate");
});

main.addEventListener("click", jump);

// Collision Detection
const checkDead = setInterval(function () {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
    block.style.animation = "none";
    block.style.display = "none";
    title.textContent = "Loser!";
  }
}, 10);
 */
//#endregion
