// Loads the video swapping elements on page load
document.addEventListener("DOMContentLoaded", () => {
  const toggleLight = document.getElementById("toggle-mode");
  const videoElement = document.querySelector(".background-clip");

  //Array of background video's
  const videoBackgrounds = [
    "Images/backGrounds/stock-footage-camping-in-the-mountains-at-night-video-footage-with-bonfire-and-tend-beautiful-view-background.webm",
    "Images/backGrounds/stock-footage-camping-in-the-mountains-at-night-video-footage-with-bonfire-and-tend-beautiful-view-background (1).webm",
    "Images/backGrounds/stock-footage-camping-in-the-mountains-at-night-video-footage-with-bonfire-and-tend-beautiful-view-background (2).webm",
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

//The start of the games content=========================
const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

//Character Inventory
let state = {};

//Starts the game
function startGame() {
  state = {};
  showTextNode(1);
}

//shows what option is available
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex); //gets current text node and then the next in the index
  textElement.innerText = textNode.text; //Possibly add styling here in the future
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild); //Removes all options
  }
  //Iterates through all the options and adds options to each
  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn"); //Possible add an if for future button class patterns
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

//Shows relevant options on screen
function showOption(option) {
  //returns options without a required state and options that pass the required(state) perameter
  return option.requiredState == null || option.requiredState(state);
}

//Selects the options
function selectOption(option) {
  const nextTextNodeId = option.nextText;
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

// The game choices and Pathways
const textNodes = [
  {
    id: 1,
    text: "You play as Phuni, with their uniqe powah of word Pun-Ishment, your goal is to reach the top of the summit while facing various challanges Good Luck!",
    options: [
      {
        text: "Together we Peak!",
        setState: { punPass: true },
        nextText: 2, //Goes to the next option AKA option 2
      },
      { text: "...No, am not doing this", nextText: 2 },
    ],
  },
  {
    id: 2,
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure aperiam dignissimos ipsam placeat architecto quis assumenda, ipsa provident repudiandae vitae dicta et aliquam corporis quod odit soluta quas voluptatem at. \n Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure aperiam dignissimos ipsam placeat architecto quis assumenda, ipsa provident repudiandae vitae dicta et aliquam corporis quod odit soluta quas voluptatem at. \n Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure aperiam dignissimos ipsam placeat architecto quis assumenda, ipsa provident repudiandae vitae dicta et aliquam corporis quod odit soluta quas voluptatem at.\n Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure aperiam dignissimos ipsam placeat architecto quis assumenda, ipsa provident repudiandae vitae dicta et aliquam corporis quod odit soluta quas voluptatem at. \nLorem ipsum, dolor sit amet consectetur adipisicing elit. Iure aperiam dignissimos ipsam placeat architecto quis assumenda, ipsa provident repudiandae vitae dicta et aliquam corporis quod odit soluta quas voluptatem at.",
    options: [
      {
        text: "User button click option if they choose they peak",
        requiredState: (currentState) => currentState.punPass,
        setState: { punPass: false, powah: true },
        nextText: 3,
      },
      {
        text: "User button click option if they choose they peak and prefer rhymes",
        requiredState: (currentState) => currentState.punPass,
        setState: { punPass: false, rhyme: true },
        nextText: 3,
      },
      {
        text: "Am not playing this dumb game!!!",
        setState: { loser: true },
        nextText: 3,
      },
      {
        text: "Fine i'll give it a chance, but no word games!",
        setState: { powerLess: true },
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: "The next step in the adventure: Blah, Blah, Blah, Blah, blah, blah, blah, s",
    options: [
      {
        text: "Text about rhyme or pun adv continuted",
        requiredState: (currentState) =>
          currentState.powah || currentState.rhyme,

        nextText: 4,
      },
      {
        text: "Text about rhyme or pun adv continued",
        requiredState: (currentState) =>
          currentState.powah || currentState.rhyme,

        nextText: 4,
      },
      {
        text: "Neglecting the powers invested within you, you continue your adventure as a mere mortal \n Amongst...not gods but other mortals with powers. \n Listen, i'll be honest, this isn't going to be eazy!",
        requiredState: (currentState) => currentState.powerLess,

        nextText: 4,
      },
    ],
  },
];
//Calls the start Game Function
startGame();
