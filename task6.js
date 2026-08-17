// ==========================================
// Application State
// ==========================================
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;


// ==========================================
// Question Objects
// ==========================================
const questions = [
  {
    id: 1,
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Kyoto"],
    correctAnswer: "Tokyo"
  },
  {
    id: 2,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mars", "Mercury", "Earth"],
    correctAnswer: "Mercury"
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    id: 4,
    question: "Who wrote the 'Harry Potter' series?",
    options: ["J.R.R. Tolkien", "J.K. Rowling", "Stephen King", "George R.R. Martin"],
    correctAnswer: "J.K. Rowling"
  },
  {
    id: 5,
    question: "What is the chemical symbol for Gold?",
    options: ["Ag", "Au", "Pb", "Fe"],
    correctAnswer: "Au"
  },
  {
    id: 6,
    question: "In what year did the Titanic sink?",
    options: ["1912", "1905", "1923", "1898"],
    correctAnswer: "1912"
  },
  {
    id: 7,
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Horse", "Greyhound"],
    correctAnswer: "Cheetah"
  },
  {
    id: 8,
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7"
  }
];

const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const submitBtn = document.getElementById('submit-btn');

// ==========================================
// Functions
// ==========================================

/**
 * Updates the DOM to display the current question.
 */
function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  
  // Call renderAnswers to display the corresponding options
  renderAnswers();
}

/**
 * Generates the radio buttons for the current question's options.
 */
function renderAnswers() {
  const currentQuestion = questions[currentQuestionIndex];
  
  // Clear any existing options from the previous question
  optionsList.innerHTML = '';
  
  // Reset the selected answer state and disable the submit button
  selectedAnswer = null;
  submitBtn.disabled = true;

  // Loop through the options and create list items with radio buttons
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement('li');
    
    // Create the radio input
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'quiz-option'; // Groups the radio buttons together
    radioInput.id = `option-${index}`;
    radioInput.value = option;
    
    // Create the label for the radio input
    const label = document.createElement('label');
    label.htmlFor = `option-${index}`;
    label.textContent = option;
    
    // Attach the click handler
    radioInput.addEventListener('change', handleAnswerClick);

    // Append to the list item, then to the unordered list
    li.appendChild(radioInput);
    li.appendChild(label);
    optionsList.appendChild(li);
  });
}

/**
 * Handles the event when a user clicks a radio button.
 * Updates the state and enables the submit button.
 */
function handleAnswerClick(event) {
  // Update state with the value of the clicked radio button
  selectedAnswer = event.target.value;
  
  // Enable the submit button now that an answer is selected
  submitBtn.disabled = false;
}

// ==========================================
// Initialization
// ==========================================
// Call renderQuestion to display the very first question when the script loads
renderQuestion();
// ==========================================
// Additional DOM Elements
// ==========================================
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score-display');
const questionContainer = document.getElementById('question-container');
const quizFooter = document.getElementById('quiz-footer');
const resultsContainer = document.getElementById('results-container');
const finalScore = document.getElementById('final-score');
const totalQuestions = document.getElementById('total-questions');
const restartBtn = document.getElementById('restart-btn');

// ==========================================
// Event Listeners
// ==========================================
submitBtn.addEventListener('click', handleSubmit);
nextBtn.addEventListener('click', handleNext);
restartBtn.addEventListener('click', restartQuiz);

// ==========================================
// New Functions
// ==========================================

/**
 * Handles the submit action, checks the answer, and locks the inputs.
 */
function handleSubmit() {
  const currentQuestion = questions[currentQuestionIndex];
  
  // 1. Check if the answer is correct
  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
    scoreDisplay.textContent = score; // Update score in the header
  }

  // 2. Prevent changing the answer: Disable all radio buttons
  const radios = document.querySelectorAll('input[name="quiz-option"]');
  radios.forEach(radio => {
    radio.disabled = true;
  });

  // 3. Swap the buttons
  submitBtn.style.display = 'none';
  nextBtn.style.display = 'inline-block';
}

/**
 * Moves to the next question or ends the quiz if it's the last question.
 */
function handleNext() {
  currentQuestionIndex++;
  
  // Check if there are still questions left
  if (currentQuestionIndex < questions.length) {
    // Reset buttons for the next question
    submitBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';
    
    // Render the next question (which also resets selectedAnswer and submit disabled state)
    renderQuestion(); 
  } else {
    // End of quiz
    showResults();
  }
}

/**
 * Hides the quiz interface and displays the final score.
 */
function showResults() {
  questionContainer.style.display = 'none';
  quizFooter.style.display = 'none';
  resultsContainer.style.display = 'block';
  
  // Populate final score numbers
  finalScore.textContent = score;
  totalQuestions.textContent = questions.length;
}

/**
 * Resets the application state and UI to start the quiz over.
 */
function restartQuiz() {
  // 1. Reset State
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  scoreDisplay.textContent = score;
  
  // 2. Reset UI Visibility
  resultsContainer.style.display = 'none';
  questionContainer.style.display = 'block';
  quizFooter.style.display = 'block';
  
  submitBtn.style.display = 'inline-block';
  nextBtn.style.display = 'none';
  
  // 3. Render the first question again
  renderQuestion();
} 