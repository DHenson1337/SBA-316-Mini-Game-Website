const nameF = document.getElementById("newsName");
const email = document.getElementById("newsEmail");
const form = document.querySelector(".newsLetterForm");
const errorElement = document.getElementById("error");

// Event listerner for error checker
form.addEventListener("submit", (e) => {
  // Cleans previous error messages
  errorElement.textContent = "";

  //Array to store error messages
  const errors = [];

  // Validate name
  if (nameF.value.trim() === "") {
    errors.push("Name is required.");
  }

  // Validate email
  if (email.value.trim() === "") {
    errors.push("Email is required.");
  } else if (!validateEmail(email.value.trim())) {
    errors.push("Please enter a valid email address.");
  }

  // Prevents submission if errors are present
  if (errors.length > 0) {
    e.preventDefault();
    errorElement.textContent = errors.join(" ");
    errorElement.style.color = "red";
  }
});

// Email validation
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

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
