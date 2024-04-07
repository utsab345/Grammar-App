const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
let edit = false;

// Load data from local storage
document.addEventListener("DOMContentLoaded", () => {
  const savedCards = JSON.parse(localStorage.getItem("flashcards")) || [];
  savedCards.forEach(card => viewlist(card.question, card.answer));
});
document.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById("welcomeText");
  const getStartedBtn = document.getElementById("add-flashcard");

  // Add fade-in effect to welcome text
  setTimeout(() => {
    welcomeText.classList.add("fade-in");
  }, 100);

  // Add event listener to button to trigger fade-out effect on welcome text
  getStartedBtn.addEventListener("click", () => {
    welcomeText.classList.remove("fade-in");
    welcomeText.classList.add("fade-out");
  });
});

// Function to show the add question card
addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.remove("hide");
});

// Function to close the add question card
closeBtn.addEventListener("click", () => {
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
  if (edit) {
    edit = false;
    submitQuestion();
  }
});

// Function to submit a question
cardButton.addEventListener("click", () => {
  submitQuestion();
});

function submitQuestion() {
  let tempQuestion = question.value.trim();
  let tempAnswer = answer.value.trim();
  if (!tempQuestion || !tempAnswer) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    viewlist(tempQuestion, tempAnswer);
    question.value = "";
    answer.value = "";
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
    saveToLocalStorage();
  }
}

// Function to create and append a new card to the list
function viewlist(tempQuestion, tempAnswer) {
  const listCard = document.querySelector(".card-list-container");
  const div = document.createElement("div");
  div.classList.add("card");

  // Question
  const questionDiv = document.createElement("p");
  questionDiv.classList.add("question-div");
  questionDiv.textContent = tempQuestion;

  // Answer
  const answerDiv = document.createElement("p");
  answerDiv.classList.add("answer-div", "hide");
  answerDiv.textContent = tempAnswer;

  // Show/Hide button
  const link = document.createElement("a");
  link.setAttribute("href", "#");
  link.setAttribute("class", "show-hide-btn");
  link.textContent = "Show/Hide";
  link.addEventListener("click", () => {
    answerDiv.classList.toggle("hide");
  });

  // Edit button
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit");
  editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
  editButton.addEventListener("click", () => {
    edit = true;
    question.value = tempQuestion;
    answer.value = tempAnswer;
    container.classList.add("hide");
    addQuestionCard.classList.remove("hide");
    disableButtons(true);
  });

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.addEventListener("click", () => {
    div.remove();
    saveToLocalStorage();
  });

  // Append elements
  div.appendChild(questionDiv);
  div.appendChild(link);
  div.appendChild(answerDiv);
  div.appendChild(editButton);
  div.appendChild(deleteButton);
  listCard.appendChild(div);
}

// Function to enable/disable edit and delete buttons
const disableButtons = (value) => {
  const editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((button) => {
    button.disabled = value;
  });
};

// Function to save data to local storage
function saveToLocalStorage() {
  const cards = Array.from(document.querySelectorAll(".card")).map(card => ({
    question: card.querySelector(".question-div").textContent,
    answer: card.querySelector(".answer-div").textContent
  }));
  localStorage.setItem("flashcards", JSON.stringify(cards));
}
