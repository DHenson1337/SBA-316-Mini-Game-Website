document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quiz-container");

  quizContainer.addEventListener("click", (e) => {
    if (e.target.matches(".answer-option")) {
      const isCorrect = e.target.dataset.correct === "true";
      e.target.style.backgroundColor = isCorrect ? "green" : "red";

      setTimeout(() => {
        const currentQuestion = e.target.closest(".question-block");
        currentQuestion.style.display = "none";

        const nextQuestion = currentQuestion.nextElementSibling;
        if (nextQuestion) {
          nextQuestion.style.display = "block";
        } else {
          alert("Quiz complete! Thanks for playing!");
        }
      }, 1000);
    }
  });
});
