//For Managing the Pop up cards in the Trivia Quiz Game

const categoryDropdown = document.getElementById(`category`);
const popupCard = document.getElementById("popup-card");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const popupImage = document.getElementById("popup-image");

/* 
function startQuiz(categoryId) {
  window.location.href = `/triviaGame?category=${categoryId}`;
} */

// No longer needed, was for individual cards
/* //Event listener for the Card flip
categoryDropdown.addEventListener(`change`, (e) => {
  const selectOption = e.target.options[e.target.selectedIndex];

  // Retrieve the attributes from the form
  const title = selectOption.getAttribute(`data-title`);
  const description = selectOption.getAttribute(`data-desc`);
  const image = selectOption.getAttribute(`data-img`);

  //update the card content
  popupTitle.textContent = title;
  popupDescription.textContent = description;
  popupImage.src = image;

  //Removes hidden class to show the card
  popupCard.classList.remove(`hidden`);
}); */

// Close the card when clicking outside of it
/* document.addEventListener("click", (e) => {
  if (!popupCard.contains(e.target) && e.target.id !== "category") {
    popupCard.classList.add("hidden");
  }
});
 */
