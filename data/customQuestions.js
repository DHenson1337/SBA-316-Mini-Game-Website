// Custom Questions Array for the trivia Game
const customQuestions = [
  {
    question: "Why don't skeletons fight each other?",
    correct_answer: "They don't have the guts.",
    incorrect_answers: [
      "They're too bony.",
      "They always break.",
      "They can't hold grudges.",
    ],
  },
  {
    question: "What do you call fake spaghetti?",
    correct_answer: "An impasta.",
    incorrect_answers: [
      "A pasta faker.",
      "A noodler.",
      "A counterfeit noodle.",
    ],
  },
  {
    question: "Why do bees have sticky hair?",
    correct_answer: "Because they use honeycombs.",
    incorrect_answers: [
      "They love honey.",
      "They stick to flowers.",
      "It's their natural conditioner.",
    ],
  },
  {
    question: "How do you organize a space party?",
    correct_answer: "You planet.",
    incorrect_answers: [
      "You launch it.",
      "You orbit it.",
      "You invite Martians.",
    ],
  },
  {
    question: "Why was the math book sad?",
    correct_answer: "It had too many problems.",
    incorrect_answers: [
      "It failed the test.",
      "It was full of equations.",
      "It lost its numbers.",
    ],
  },
  {
    question: "Why don't eggs tell jokes?",
    correct_answer: "They might crack up.",
    incorrect_answers: [
      "They're too scrambled.",
      "They're too fragile.",
      "They don’t have yolks.",
    ],
  },
  {
    question: "Why did the scarecrow win an award?",
    correct_answer: "Because he was outstanding in his field.",
    incorrect_answers: [
      "He was a good farmer.",
      "He was scary.",
      "He loved the outdoors.",
    ],
  },
  {
    question: "Why did the bicycle fall over?",
    correct_answer: "It was two tired.",
    incorrect_answers: [
      "It had a flat tire.",
      "It hit a rock.",
      "It was unbalanced.",
    ],
  },
  {
    question: "What do you call cheese that isn’t yours?",
    correct_answer: "Nacho cheese.",
    incorrect_answers: [
      "Your cheese.",
      "Borrowed cheese.",
      "Mozarella imposter.",
    ],
  },
  {
    question: "Why couldn’t the leopard play hide and seek?",
    correct_answer: "Because he was always spotted.",
    incorrect_answers: [
      "He was too fast.",
      "He couldn't hide.",
      "He didn't like games.",
    ],
  },
  {
    question: "What do you call a bear with no teeth?",
    correct_answer: "A gummy bear.",
    incorrect_answers: ["A soft bear.", "A toothless bear.", "A plush bear."],
  },
  {
    question: "Why did the golfer bring two pairs of pants?",
    correct_answer: "In case he got a hole in one.",
    incorrect_answers: [
      "For a spare change.",
      "To stay stylish.",
      "For the rainy weather.",
    ],
  },
  {
    question: "What kind of music do mummies listen to?",
    correct_answer: "Wrap music.",
    incorrect_answers: ["Classical tunes.", "Drum beats.", "Skeleton songs."],
  },
  {
    question: "Why can't your nose be 12 inches long?",
    correct_answer: "Because then it would be a foot.",
    incorrect_answers: [
      "It’s too big.",
      "It would look funny.",
      "It doesn’t grow like that.",
    ],
  },
  {
    question: "What do you call a cow with no legs?",
    correct_answer: "Ground beef.",
    incorrect_answers: ["Legless cow.", "Beef patties.", "Flat cow."],
  },
  {
    question: "Why are elevator jokes so good?",
    correct_answer: "They work on so many levels.",
    incorrect_answers: [
      "They're uplifting.",
      "They always rise.",
      "They never fall flat.",
    ],
  },
  {
    question: "What’s orange and sounds like a parrot?",
    correct_answer: "A carrot.",
    incorrect_answers: ["A trumpet.", "An orange bird.", "A tangerine."],
  },
  {
    question: "Why don’t oysters donate to charity?",
    correct_answer: "Because they are shellfish.",
    incorrect_answers: [
      "They lack funds.",
      "They don’t care.",
      "They live underwater.",
    ],
  },
  {
    question: "Why did the tomato blush?",
    correct_answer: "Because it saw the salad dressing.",
    incorrect_answers: ["It was shy.", "It got squeezed.", "It felt exposed."],
  },
  {
    question: "Why can’t you give Elsa a balloon?",
    correct_answer: "Because she will let it go.",
    incorrect_answers: [
      "She’s afraid of heights.",
      "She might pop it.",
      "She dislikes balloons.",
    ],
  },
];

// Functions for managing the questions

const getAllCustomQuestions = () => customQuestions;

//Put route
const addCustomQuestion = (newQuestion) => {
  customQuestions.push(newQuestion);
};
//Patch route
const updateCustomQuestion = (index, updatedQuestion) => {
  if (customQuestions[index]) {
    customQuestions[index] = updatedQuestion;
  } else {
    console.error("Question not found at index", index);
  }
};

//Delete route
const deleteCustomQuestion = (index) => {
  if (customQuestions[index]) {
    customQuestions.splice(index, 1); // Remove the question at the specified index
  } else {
    console.error("Question not found at index", index);
  }
};

module.exports = {
  getAllCustomQuestions,
  addCustomQuestion,
  updateCustomQuestion,
  deleteCustomQuestion,
};
