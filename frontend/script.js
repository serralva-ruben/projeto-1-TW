import { validateInput } from "./scripts/validator.js";

function checkAnswers() {
  const correctAnswers = {
    q1: "a",
    q2: "5",
    q3: "michael jackson",
    q4: "got to be there",
    q5: "c",
    q6: "d",
    q7: "a",
    q8: "b",
    q9: "b",
    q10: "3",
    q11: "a",
    q12: ["a", "d"],
    q13: ["a", "c", "d"],
    q14: ["a", "c"],
    q15: "b",
    q16: "d"
  };

  let score = 0;
  const questionNames = Object.keys(correctAnswers);
  let result = {};
  let responses = {};

  for (const questionName of questionNames) {
    const answerInputs = document.getElementsByName(questionName);
    let correctCount = 0;
    let userResponses = [];

    for (const input of answerInputs) {
      const isInputCorrect = checkInputCorrectness(input, questionName, correctAnswers);
      if (isInputCorrect) {
        correctCount++;
      }
      if (input.checked) {
        userResponses.push(input.value);
      }
    }
    if (correctCount > 0) {
      result[questionName] = true;
      score++;
    } else {
      result[questionName] = false;
    }
    responses[questionName] = userResponses;
  }

  const params = new URLSearchParams();
  params.set('result', JSON.stringify(result));
  params.set('score', score);

  const data = {
    score: score,
    responses: responses
  };

  fetch('http://localhost:8020/api/users/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}` // Add the JWT token to the request headers
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    // Redirect to the summary page after successful submission
    window.location.href = './summaryPage/summary.html' + '?' + params.toString();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function checkInputCorrectness(input, questionName, correctAnswers) {
  const inputType = input.type;
  const inputValue = input.value;
  const correctAnswer = correctAnswers[questionName];

  if (
    (inputType === "radio" && input.checked && inputValue === correctAnswer) ||
    (inputType === "checkbox" && input.checked && correctAnswer.includes(inputValue)) ||
    (inputType === "select-one" && inputValue === correctAnswer) ||
    (inputType === "text" && inputValue.toLowerCase() === correctAnswer) ||
    (inputType === "range" && inputValue === correctAnswer)
  ) {
    return true;
  }
}

function start() {
  progressBarSetup();
  update();
}

function progressBarSetup() {
  const questions = document.querySelectorAll('.question');
  const progressDiv = document.getElementById('progress');

  // Add a progress square for each question
  for (let i = 0; i < questions.length; i++) {
    progressDiv.innerHTML += "<div class='progressSquare' id='sq" + i + "'>Q" + (i + 1) + "</div>";
  }

  // Add click event listeners to the progress squares
  for (let i = 0; i < questions.length; i++) {
    document.getElementById("sq" + i).addEventListener('click', () => {
      const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
      questions[currentQuestionIndex].style.display = 'none';
      questions[i].style.display = 'block';
      update();
    });
  }
}

function updateAnsweredViewer() {
  const questions = document.querySelectorAll('.question');
  let squareDivs = [];

  // Get all the question elements and their corresponding progress squares
  for (let i = 0; i < questions.length; i++) {
    squareDivs[i] = document.getElementById("sq" + i);
    if (questions[i].classList.contains('answered')) {
      squareDivs[i].style.background = "green";
    } else {
      squareDivs[i].style.background = "#9f9f9f";
    }
  }
}

function updateCounter() {
  const questions = document.querySelectorAll('.question');
  const counter = document.querySelector('.question-counter');
  const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
  counter.innerText = `Pergunta: ${currentQuestionIndex + 1} / ${questions.length}`;
}

function updateNextBackButtons() {
  const nextBtn = document.getElementById('next-btn');
  const backBtn = document.getElementById('back-btn');
  const questions = document.querySelectorAll('.question');
  const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');

  // Update the background color of the next and back buttons based on the current question
  if (currentQuestionIndex === 0) {
    backBtn.style.backgroundColor = "Grey";
  } else {
    backBtn.style.backgroundColor = "#021c50";
  }

  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.style.backgroundColor = "Grey";
  } else {
    nextBtn.style.backgroundColor = "#021c50";
  }
}

function updateCurrentQuestionBorder() {
  let squareDivs = [];
  const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');

  // Get all the question elements and their corresponding progress squares
  for (let i = 0; i < document.querySelectorAll('.question').length; i++) {
    squareDivs[i] = document.getElementById("sq" + i);
  }

  // Reset the border for all progress squares and set the border for the current question's progress square
  squareDivs.forEach(squareDiv => {
    squareDiv.style.border = "";
  });
  squareDivs[currentQuestionIndex].style.border = "2px dashed red";
}

function getToken() {
  return localStorage.getItem('token');
}

document.addEventListener('DOMContentLoaded', () => {
  const questions = document.querySelectorAll('.question');
  start();
  // Hide all questions except the first one
  for (let i = 1; i < questions.length; i++) {
    questions[i].style.display = 'none';
  }

  const radios = document.querySelectorAll('input[type="radio"]');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const selections = document.querySelectorAll('select');
  const inputs = document.querySelectorAll('input[type="text"]');
  const sliders = document.querySelectorAll('input[type="range"]');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-btn');
  const backBtn = document.getElementById('back-btn');

  radios.forEach(radio => {
    radio.addEventListener('click', handleRadioClick);
  });

  checkboxes.forEach(cb => {
    cb.addEventListener('click', handleCheckBoxes);
  });

  selections.forEach(dropdown => {
    dropdown.addEventListener('change', handleDropdown);
  });

  inputs.forEach(input => {
    input.addEventListener('input', handleTextInput);
  });

  sliders.forEach(slider => {
    slider.addEventListener('input', handleSliderInput);
  });

  function handleRadioClick() {
    const currentQuestion = this.parentNode.parentNode;
    currentQuestion.classList.add('answered');
    update();
  }

  function handleCheckBoxes() {
    const currentQuestion = this.parentNode.parentNode;
    const checkboxesInCurrentQuestion = currentQuestion.querySelectorAll('input[type="checkbox"]');
    let anyChecked = Array.from(checkboxesInCurrentQuestion).some(checkbox => checkbox.checked);
    if (anyChecked) {
      currentQuestion.classList.add('answered');
    } else {
      currentQuestion.classList.remove('answered');
    }
    update();
  }

  function handleDropdown() {
    let currentQuestion = this.parentNode;
    while (!currentQuestion.classList.contains('question')) {
      currentQuestion = currentQuestion.parentNode;
    }
    currentQuestion.classList.add('answered');
    update();
  }

  function handleTextInput() {
    const currentQuestion = this.parentNode.parentNode;
    const value = this.value.trim();
    const isValid = validateInput(this, value);

    // Add or remove the 'answered' class based on the validity of the input
    if (isValid && !currentQuestion.classList.contains('answered')) {
      currentQuestion.classList.add('answered');
      const questionIndex = Array.from(document.querySelectorAll('.question')).indexOf(currentQuestion);
      const progressSquare = document.getElementById("sq" + questionIndex);
      progressSquare.style.background = "green";
    } else if (!isValid && currentQuestion.classList.contains('answered')) {
      currentQuestion.classList.remove('answered');
      const questionIndex = Array.from(document.querySelectorAll('.question')).indexOf(currentQuestion);
      const progressSquare = document.getElementById("sq" + questionIndex);
      progressSquare.style.background = "#9f9f9f";
    }
    update();
  }

  function handleSliderInput() {
    const sliderValue = this.parentElement.querySelector('.slider-value');
    sliderValue.textContent = this.value;
    let currentQuestion = this.parentNode;
    while (!currentQuestion.classList.contains('question')) {
      currentQuestion = currentQuestion.parentNode;
    }
    currentQuestion.classList.add('answered');
    update();
  }

  submitBtn.addEventListener('click', () => {
    checkAnswers();
  });

  backBtn.addEventListener('click', () => {
    const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
    if (currentQuestionIndex > 0) {
      questions[currentQuestionIndex].style.display = 'none';
      questions[currentQuestionIndex - 1].style.display = 'block';
    }
    update();
  });

  nextBtn.addEventListener('click', () => {
    const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
    if (currentQuestionIndex < questions.length - 1) {
      questions[currentQuestionIndex].style.display = 'none';
      questions[currentQuestionIndex + 1].style.display = 'block';
    }
    update();
  });
});

function update() {
  updateCurrentQuestionBorder();
  updateCounter();
  updateAnsweredViewer();
  validateInput();
}

function refreshPage() {
  window.location.reload();
}
