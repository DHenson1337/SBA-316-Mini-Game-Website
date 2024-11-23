//Poke API
const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const TYPE_URL = "https://pokeapi.co/api/v2/type/";
const GENERATION_URL = "https://pokeapi.co/api/v2/generation/";
const missingNo = "../Images/PokeMon imgs/MissingNo_RB.webp";

//#region  Video Backgrounds
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
        sortedPokemon.push({
          id: pokemon.id,
          name: pokemon.name.replace(/-.*$/, ""), // Removes anything after a "-"
          types: pokemon.types.map((type) => type.type.name),
          sprite: isShiny()
            ? pokemon.sprites.front_shiny
            : pokemon.sprites.front_default,
        });
      } else {
        console.warn(`Could not fetch details for Pokemon: ${name}`);
      }
    } catch (error) {
      console.error(`Team Rocket stole ${name}: ${error.message}`);
    }
  }

  //Sorts the pokemon by ID
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