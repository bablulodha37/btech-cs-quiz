// script.js

// --- Quiz Data (B.Tech Computer Science Core Subjects) ---
const quizData = [
    {
        question: "In C++, what is a constructor?",
        options: ["A special function to initialize objects", "A function to delete objects", "A class destructor", "A type of loop"],
        correct: 0
    },
    {
        question: "Which data structure uses LIFO (Last In First Out)?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correct: 1
    },
    {
        question: "In DBMS, what does ACID stand for?",
        options: [
            "Atomicity, Consistency, Isolation, Durability",
            "Availability, Consistency, Integrity, Durability",
            "Atomicity, Consistency, Integrity, Dependency",
            "Access, Control, Isolation, Data"
        ],
        correct: 0
    },
    {
        question: "Which layer of the OSI model is responsible for routing?",
        options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
        correct: 2
    },
    {
        question: "What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correct: 2
    }
];

// --- DOM Elements ---
const questionText = document.getElementById('question-text');
const optionsBox = document.getElementById('options-box');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const nextButton = document.getElementById('next-btn');
const feedbackDiv = document.getElementById('feedback');
const resultBox = document.getElementById('result-box');
const finalScoreSpan = document.getElementById('final-score');
const finalTotalSpan = document.getElementById('final-total');
const restartButton = document.getElementById('restart-btn');
const quizHeader = document.querySelector('.quiz-header');
const questionBox = document.querySelector('.question-box');
const nextBtnContainer = document.querySelector('.next-btn-container');

// --- State Variables ---
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = quizData.length;
let selectedOption = null; // To track if an option is selected for the current question
let quizFinished = false;

// --- Initial Setup ---
totalQuestionsSpan.textContent = totalQuestions;

// --- Functions ---

// Function to load a question
function loadQuestion() {
    // Reset state for new question
    selectedOption = null;
    feedbackDiv.textContent = '';
    feedbackDiv.style.backgroundColor = 'transparent';
    nextButton.disabled = true;

    if (quizFinished || currentQuestionIndex >= totalQuestions) {
        showResults();
        return;
    }

    const currentQ = quizData[currentQuestionIndex];
    questionText.textContent = currentQ.question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    // Clear previous options
    optionsBox.innerHTML = '';

    // Create option buttons
    currentQ.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`; // A., B., C., D.
        button.dataset.index = index;

        // Add event listener
        button.addEventListener('click', (event) => handleOptionClick(event, currentQ.correct));

        optionsBox.appendChild(button);
    });
}

// Function to handle option click
function handleOptionClick(event, correctIndex) {
    // If an option was already selected or quiz is finished, ignore further clicks
    if (selectedOption !== null || quizFinished) return;

    const clickedButton = event.currentTarget;
    const clickedIndex = parseInt(clickedButton.dataset.index);

    // Mark that an option has been selected
    selectedOption = clickedIndex;

    // Disable all option buttons
    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach(button => {
        button.disabled = true;
    });

    // Check if answer is correct
    if (clickedIndex === correctIndex) {
        // Correct answer
        clickedButton.classList.add('correct');
        score++;
        scoreSpan.textContent = score;
        feedbackDiv.textContent = '✅ Correct! Well done!';
        feedbackDiv.style.backgroundColor = '#c6f6d5';
        feedbackDiv.style.color = '#22543d';
    } else {
        // Wrong answer
        clickedButton.classList.add('wrong');
        // Highlight the correct answer as well
        allOptions[correctIndex].classList.add('correct');
        feedbackDiv.textContent = `❌ Incorrect. The correct answer is ${String.fromCharCode(65 + correctIndex)}.`;
        feedbackDiv.style.backgroundColor = '#fed7d7';
        feedbackDiv.style.color = '#742a2a';
    }

    // Enable the next button
    nextButton.disabled = false;
}

// Function to handle next button click
function handleNextClick() {
    if (quizFinished) return;

    // Move to next question
    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        loadQuestion();
    } else {
        // Quiz finished
        quizFinished = true;
        showResults();
    }
}

// Function to show results
function showResults() {
    // Hide quiz elements
    questionBox.style.display = 'none';
    optionsBox.style.display = 'none';
    nextBtnContainer.style.display = 'none';
    quizHeader.style.display = 'none';
    feedbackDiv.style.display = 'none';

    // Show result box
    resultBox.style.display = 'block';
    finalScoreSpan.textContent = score;
    finalTotalSpan.textContent = totalQuestions;
}

// Function to restart the quiz
function restartQuiz() {
    // Reset state
    currentQuestionIndex = 0;
    score = 0;
    quizFinished = false;
    selectedOption = null;

    // Update UI elements
    scoreSpan.textContent = score;

    // Show quiz elements
    questionBox.style.display = 'block';
    optionsBox.style.display = 'grid';
    nextBtnContainer.style.display = 'flex';
    quizHeader.style.display = 'flex';
    feedbackDiv.style.display = 'block';
    resultBox.style.display = 'none';

    // Reset feedback style
    feedbackDiv.textContent = '';
    feedbackDiv.style.backgroundColor = 'transparent';

    // Load the first question
    loadQuestion();
}

// --- Event Listeners ---
nextButton.addEventListener('click', handleNextClick);
restartButton.addEventListener('click', restartQuiz);

// --- Initialize the quiz ---
loadQuestion();
