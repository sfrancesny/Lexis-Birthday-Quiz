var currentSlide = 0;
var slides = document.getElementsByClassName("slide");

function showSlide(n) {
  // Hide all slides
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Calculate the index of the next slide
  currentSlide += n;

  // Wrap around to the first slide if reached the end
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  // Display the current slide
  slides[currentSlide].style.display = "block";
}

function changeSlide(n) {
  showSlide(n);
}

// Show the first slide initially
showSlide(0);

// Quiz questions
 const questions = [
{
    question: "What was the name of Lexis's first pet?",
    choices: ["Ginger", "Lola", "Pepsi", "Max"],
    correctAnswer: "Pepsi"
},
{
    question: "What is the name of Lexis father?",
    choices: ["Samson Jr", "Dennis", "Michael", "Robert"],
    correctAnswer: "Samson Jr"
},
{
    question: "What college did Lexis graduated from?",
    choices: ["Marymount Manhatten College", "CUNY Queens College", "Mercy College", "John Jay College"],
    correctAnswer: "John Jay College"
},
{
    question: "What hand does Lexis write with?",
    choices: ["she can't write", "right hand", "both hands", "left"],
    correctAnswer: "right hand"
},
{
    question: "What was the first country Lexis travel to? ",     choices: ["France", "Greece", "Liberia", "Italy"],
    correctAnswer: "Liberia"
},
{
    question: "What is the name of Lexis Mother?",
    choices: ["Josephine", "Frances", "Sabrina", "Rena"],
    correctAnswer: "Rena"
},
{
    question: "What genre of series/movies will Lexis binge on?",
    choices: ["Soap Opera", "Comedy", "K-Drama", "Romance"],
    correctAnswer: "K-Drama"
},
{
    question: "What high school did Lexis graduate from?",
    choices: ["Clara Barton High School", "Brooklyn Prep High School", "Grand St High School", "FDR High School"],
    correctAnswer: "Clara Barton High School"
},
{
    question: "What year did Lexis graduate from high school?",
    choices: ["2012", "1992", "2019", "2015"],
    correctAnswer: "2015"
},
{
    question: "What astrology sign is Lexis?",
    choices: ["Gemini", "Cancer", "Pisces", "Aries"],
    correctAnswer: "Cancer"
},
{
    question: "What age will Lexis be turning this year?",
    choices: ["22", "65", "26", "14"],
    correctAnswer: "26"
},
{
    question: "Who is Lexis favorite cousin?",
    choices: ["Dayo Johnson", "Monica Nyenkan","Ophelia Manubah","Sonia Nyenkan"],
    correctAnswer: "Sonia Nyenkan"
},
];
// Quiz settings
const quizDuration = 10; // Quiz duration in minutes
const timePenalty = 1; // Time penalty for incorrect answer in minutes

// Global variables
let currentQuestionIndex = 0;
let timeRemaining = quizDuration * 60; // Convert duration to seconds
let timerInterval;

// DOM elements
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const timeRemainingElement = document.getElementById("time-remaining");
const feedbackElement = document.getElementById("feedback");
const scoreForm = document.getElementById("score-form");
const initialsInput = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score");

// Event listeners
startButton.addEventListener("click", startQuiz);
questionContainer.addEventListener("click", handleAnswer);
saveScoreButton.addEventListener("click", saveScore);

// Function to start the quiz
function startQuiz() {
  startButton.style.display = "none";
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
}

// Function to update the timer
function updateTimer() {
  timeRemaining--;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timeRemainingElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  if (timeRemaining <= 0) {
    endQuiz();
  }
}

// Function to show a question
function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionContainer.innerHTML = `
    <h2>${question.question}</h2>
    <ul>
      ${question.choices.map(choice => `<li>${choice}</li>`).join("")}
    </ul>
  `;
}

// Function to handle user's answer selection
function handleAnswer(event) {
  if (event.target.matches("li")) {
    const selectedChoice = event.target.textContent;
    const question = questions[currentQuestionIndex];

    // Update the selectedAnswer property of the question object
    question.selectedAnswer = selectedChoice;

    if (selectedChoice === question.correctAnswer) {
      feedbackElement.textContent = "Correct!";
    } else {
      feedbackElement.textContent = "Incorrect!";
      timeRemaining -= timePenalty * 60; // Convert penalty to seconds
      if (timeRemaining < 0) {
        timeRemaining = 0;
      }
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
}

// Function to calculate the score
function calculateScore() {
  const totalQuestions = questions.length;
  let correctAnswers = 0;
  
  questions.forEach(question => {
    if (question.selectedAnswer === question.correctAnswer) {
      correctAnswers++;
    }
  });

  const score = (correctAnswers / totalQuestions) * 100;
  return score.toFixed(2); // Return the score rounded to 2 decimal places
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  
  const score = calculateScore();
  const quizOverHTML = `
    <div class="quiz-over">
      Quiz Over! Your score: <span>${score}%</span>
    </div>
  `;
  
  questionContainer.innerHTML = quizOverHTML;
  scoreForm.style.display = "block";
}
