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
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild); //Removes all options
  }
  //Iterates through all the options and adds options to each
  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

//Shows relevant options on screen
function showOption(option) {
  return true;
}

//Selects the options
function selectOption(option) {}

// The game choices and Pathways
const textNodes = [
  {
    id: 1,
    text: "You play as Puni, with their uniqe powah of Pun-Ishment, your goal is to reach the top of the summit while facing various challanges Good Luck!",
    options: [
      {
        text: "Together we Peak!",
        setState: { punPass: true },
        nextText: 2, //Goes to the next option AKA option 2
      },
      { text: "...You've hit rock bottom", nextText: 2 },
    ],
  },
  {
    id: 2,
  },
];
//Calls the start Game Function
startGame();
