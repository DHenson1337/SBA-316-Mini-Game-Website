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
const spriteBox = document.querySelector(".spriteBox img");
const scoreKeeper = document.getElementById("scoreKeeper");

//#region  Pokemon form names
// Thank you Nicholas for this list
const nameConversion = {
  "Nidoran-f": "Nidoran ♀",
  "Nidoran-m": "Nidoran ♂",
  "Mr-mime": "Mr. Mime",
  "Deoxys-normal": "Deoxys",
  "Wormadam-plant": "Wormadam",
  "Mime-jr": "Mime Jr.",
  "Porygon-z": "Porygon-Z",
  "Giratina-altered": "Giratina",
  "Shaymin-land": "Shaymin",
  "Basculin-red-striped": "Basculin",
  "Darmanitan-standard": "Darmanitan",
  "Tornadus-incarnate": "Tornadus",
  "Thundurus-incarnate": "Thundurus",
  "Landorus-incarnate": "Landorus",
  "Keldeo-ordinary": "Keldeo",
  "Meloetta-aria": "Meloetta",
  "Meowstic-male": "Meowstic",
  "Aegislash-shield": "Aegislash",
  "Pumpkaboo-average": "Pumpkaboo",
  "Gourgeist-average": "Gourgeist",
  "Zygarde-50": "Zygarde",
  "Oricorio-baile": "Oricorio",
  "Lycanroc-midday": "Lycanroc",
  "Wishiwashi-solo": "Wishiwashi",
  "Minior-red-meteor": "Minior",
  "Mimikyu-disguised": "Mimikyu",
  mimikyu: "mimikyu-disguised",
  "Tapu-koko": "Tapu Koko",
  "Tapu-lele": "Tapu Lele",
  "Tapu-bulu": "Tapu Bulu",
  "Tapu-fini": "Tapu Fini",
  "Toxtricity-amped": "Toxtricity",
  "Mr-rime": "Mr. Rime",
  "Eiscue-ice": "Eiscue",
  "Indeedee-male": "Indeedee",
  "Morpeko-full-belly": "Morpeko",
  "Urshifu-single-strike": "Urshifu",
  "Basculegion-male": "Basculegion",
  "Enamorus-incarnate": "Enamorus",
  "Great-tusk": "Great Tusk",
  "Scream-tail": "Scream Tail",
  "Brute-bonnet": "Brute Bonnet",
  "Flutter-mane": "Flutter Mane",
  "Slither-wing": "Slither Wing",
  "Sandy-shocks": "Sandy Shocks",
  "Iron-treads": "Iron Treads",
  "Iron-bundle": "Iron Bundle",
  "Iron-hands": "Iron Hands",
  "Iron-jugulis": "Iron Jugulis",
  "Iron-moth": "Iron Moth",
  "Iron-thorns": "Iron Thorns",
  "Wo-chien": "Wo-Chien",
  "Chien-pao": "Chien-Pao",
  "Ting-lu": "Ting-Lu",
  "Chi-yu": "Chi-Yu",
  "Roaring-moon": "Roaring Moon",
  "Iron-valiant": "Iron Valiant",
  "Walking-wake": "Walking Wake",
  "Iron-leaves": "Iron Leaves",
  "Gouging-fire": "Gouging Fire",
  "Raging-bolt": "Raging Bolt",
  "Iron-boulder": "Iron Boulder",
  "Iron-crown": "Iron Crown",
};

// Converts user input to canonical name
const getCanonicalName = (inputName) => {
  const lowerCaseName = inputName.toLowerCase();
  return nameConversion[lowerCaseName] || lowerCaseName;
};
//#endregion
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
    // Convert the input name using the mapping
    const canonicalName = getCanonicalName(pokeName);
    const response = await fetch(`${API_URL}${canonicalName}`);
    if (!response.ok) throw new Error("Pokémon now belongs to team Rocket! ");
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

//lazy loading for sprite box function
function loadSprite(imageUrl) {
  spriteBox.setAttribute("loading", "lazy");
  spriteBox.src = imageUrl;
}

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
        character.style.display = "block";
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
        const sprite = isShiny()
          ? pokemon.sprites.front_shiny
          : pokemon.sprites.front_default;

        const backSprite = isShiny()
          ? pokemon.sprites.back_shiny
          : pokemon.sprites.back_default;

        sortedPokemon.push({
          id: pokemon.id,
          name: pokemon.name,
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
    const canonicalName = getCanonicalName(nameInput); //convers the name input to CanonicalName
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

//Random number between 0.5 - 11
const spin = Math.random() * (0.6 - 0.2) + 0.2;
//Score keeper variable
let score = 0;
let timerId;

//Game Background Variable
bgImg =
  "https://hoani.net/assets/images/posts/blog/clover-trajectory/intercept.gif";

// Function to update the score every second
function startTimer() {
  timerId = setInterval(() => {
    score++; // Increase the score by 1 every (x time)
    console.log(score);
    scoreKeeper.textContent = score;
  }, 1000);
}

//function to stop the timer
function stopTimer() {
  clearInterval(timerId); // Stop the timer using the interval ID
  console.log("Timer stopped at:", score);
  score = 0;
}

//function for music
let audio;
const playMusic = () => {
  if (!audio) {
    audio = new Audio(`../audio/bgm/B&WLowHealthRemix.mp3`);
    audio.loop = true;
  }

  //error check for audio
  audio.play().catch((error) => {
    console.error("Audio play failed", error);
  });

  return audio;
};

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
// const originalCharacter.src = character.src;
// Reset function to revert to the original character sprite
function resetCharacter() {
  // Reset the character image to the original
  character.src = originalCharacter.src; // Set it back to the original sprite

  // Remove transformations
  character.classList.remove("shrink", "grow");
  character.style.transform = "scale(1)";
}

//Starts the game
function startGame() {
  title.textContent = "Poké Run";
  scoreKeeper.textContent = `${score}`;

  //Sets the background img on game start
  main.style.backgroundImage = `url("${bgImg}")`;

  //Starts the score Timer:
  startTimer();

  //Play's music on game start
  playMusic();

  //Reset Positions
  characterContainer.style.top = "150px";
  characterContainer.style.left = "50px";
  block.style.left = "480px";

  // Restart animation
  block.style.animation = `block 1s infinite linear,spin ${spin}s infinite linear`;
  block.style.display = "block";

  //Enable Collision detection
  checkCollisionInterval = setInterval(() => {
    if (checkCollision()) {
      console.log("Collision detected"); //debugging to determine collision detection window
    }
  }, 15); //Collision detection interval
}

// Resets the game:
function resetGame() {
  characterContainer.style.top = "150px";
  characterContainer.style.left = "50px";
  block.style.left = "480px";

  //resets background to blank state
  main.style.backgroundImage = `url("")`;

  //Stop the music when the game ends
  if (audio) {
    audio.pause();
    audio.currentTime = 0; //Sets the music back to the start
  }

  // Stop the timer when a collision happens or when the game ends
  scoreKeeper.textContent = `Game Reset Score: ${score}`; // Placed before the score is cleaned
  stopTimer();
  console.log("Game Reset! Final time: ", score);

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
let isJumping = false;

// Trigger the jump animation
document.addEventListener("keydown", (e) => {
  if (e.key === "x" && !isJumping) {
    // x triggers jump
    character.classList.add("animate");
    isJumping = true;

    setTimeout(() => {
      // After jump animation ends, check for collision
      if (checkCollision()) {
        console.log("Collision detected!");
        // Handle collision (e.g., reset position, stop game, etc.)
      }
      isJumping = false;
      character.classList.remove("animate");
    }, 800); // Time corresponding to jump duration
  }
});

// Collision detection function
const checkCollision = () => {
  const characterRect = character.getBoundingClientRect();
  const blockRect = block.getBoundingClientRect();

  const hasCollision =
    characterRect.left < blockRect.left + blockRect.width &&
    characterRect.left + characterRect.width > blockRect.left &&
    characterRect.top < blockRect.top + blockRect.height &&
    characterRect.top + characterRect.height > blockRect.top;

  if (hasCollision) {
    //Debugging for hit detection
    console.log("Character:", character.getBoundingClientRect());
    console.log("Block:", block.getBoundingClientRect());

    //stops the audio on collision
    if (audio) {
      audio.pause();
      audio.currentTime = 0; //Sets the music back to the start
    }

    // Stop the timer when a collision happens or when the game ends
    scoreKeeper.textContent = `Final Score ${score}`; //Placed before final score is cleaned
    stopTimer();
    console.log("Game Over! Final time:", score);

    //Stop the block
    block.style.animation = "none";
    block.style.display = "none";

    title.textContent = "Game Over!";

    //Stops checking for collision
    clearInterval(checkCollisionInterval);

    //Shrinks Character on Collison: (PokeBall Style)
    //Come back and work on this when free
    /* character.classList.add("shrink");

    setTimeout(() => {
      character.src = "../Images/PokeMon imgs/cleanPokeBall.png";

      character.classList.remove("shrink");
      character.classList.add("grow");
    }, 1000); */

    //Reset Game Status

    gameStarted = false;

    //If a collision is detected
    return true;
  }
  return false;
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
