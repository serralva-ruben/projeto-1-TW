function checkAnswers() {
    // Object containing the correct answers for each question
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

    let score = 0;  // Variable to keep track of the score
    const questionNames = Object.keys(correctAnswers);  // Array of question names

    // Iterate over each question
    for (const questionName of questionNames) {
        // Get the input elements for the current question
        const answerInputs = document.getElementsByName(questionName);
        let correctCount = 0;   // Counter for the number of correct answers

        // Iterate over each answer input for the current question
        for (const input of answerInputs) {
            // Check the type of the input and compare the user's answer with the correct answer(s)
            if ((input.type === "radio" && input.checked && input.value === correctAnswers[questionName]) ||
                (input.type === "checkbox" && input.checked && correctAnswers[questionName].includes(input.value)) ||
                (input.type === "select-one" && input.value === correctAnswers[questionName]) ||
                (input.type === "text" && input.value.toLowerCase() === correctAnswers[questionName]) ||
                (input.type === "range" && input.value === correctAnswers[questionName])
            ) { correctCount++; }   // Increment the correct count if the answer is correct
        }
        if (correctCount > 0) {
            score++; // Increment the score if at least one answer is correct
        }
    }
    alert("Acertaste em " + score + " de " + questionNames.length + " perguntas."); // Display the score in an alert
}


function start() {
    // Get all the question elements and the progress div
    const questions = document.querySelectorAll('.question');
    const progressDiv = document.getElementById('progress')

    // Add a progress square for each question
    for (let i = 0; i < questions.length; i++) {
        progressDiv.innerHTML += "<div class='progressSquare' id='sq" + i + "'>Q" + (i + 1) + "</div>"
    }

    // Add click event listeners to the progress squares
    for (let i = 0; i < questions.length; i++) {
        document.getElementById("sq" + i).addEventListener('click', () => {
            const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
            questions[currentQuestionIndex].style.display = 'none';
            questions[i].style.display = 'block';
            update()
        })
    }
    update()
}

function updateAnsweredViewer() {
    let squareDivs = []
    // Get all the question elements and their corresponding progress squares
    for (let i = 0; i < document.querySelectorAll('.question').length; i++) {
        squareDivs[i] = document.getElementById("sq" + i)
        // Update the background color of the progress square based on whether the question is answered or not
        if (document.querySelectorAll('.question')[i].classList.contains('answered')) {
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

    // Update the question counter text
    counter.innerText = `Pergunta: ${currentQuestionIndex + 1} / ${questions.length}`;
}

function updateNextBackButtons() {
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const questions = document.querySelectorAll('.question')
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
    let squareDivs = []
    const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');

    // Get all the question elements and their corresponding progress squares
    for (let i = 0; i < document.querySelectorAll('.question').length; i++) {
        squareDivs[i] = document.getElementById("sq" + i)
    }

    // Reset the border for all progress squares and set the border for the current question's progress square
    squareDivs.forEach(squareDiv => {
        squareDiv.style.border = "";
    })
    squareDivs[currentQuestionIndex].style.border = "2px dashed red";
}

function validateInput(input, value) {
    if (value && value.trim() !== "") {
        // Check if the value is not undefined and not an empty string
        const regexPattern = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
        const isValid = regexPattern.test(value.trim());

        if (!isValid) {
            input.style.backgroundColor = 'red'; // Set red background color for invalid input
        } else {
            input.style.backgroundColor = ''; // If input is valid it will remain as it is
        }
        return isValid;
    }
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');

    // Hide all questions except the first one
    for (let i = 1; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }

    // Add event listeners to the answer inputs
    const radios = document.querySelectorAll('input[type="radio"]');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selections = document.querySelectorAll('select');
    const inputs = document.querySelectorAll('input[type="text"]');
    const sliders = document.querySelectorAll('input[type="range"]');
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');

    // Radio buttons
    radios.forEach(radio => {
        radio.addEventListener('click', () => {
            const currentQuestion = radio.parentNode.parentNode;
            currentQuestion.classList.add('answered');
            update();
        });
    });

    // Checkboxes
    checkboxes.forEach(cb => {
        cb.addEventListener('click', () => {
            const currentQuestion = cb.parentNode.parentNode;
            const checkboxesInCurrentQuestion = currentQuestion.querySelectorAll('input[type="checkbox"]');

            // Check if any checkboxes in the current question are checked
            let anyChecked = Array.from(checkboxesInCurrentQuestion).some(checkbox => checkbox.checked);

            // If at least one checkbox is checked, add the 'answered' class
            // Otherwise, remove the 'answered' class
            if (anyChecked) { currentQuestion.classList.add('answered'); }
            else { currentQuestion.classList.remove('answered'); }
            update();
        });
    });

    // Select dropdowns
    selections.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
            let currentQuestion = dropdown.parentNode;
            while (!currentQuestion.classList.contains('question')) {
                currentQuestion = currentQuestion.parentNode;
            }
            currentQuestion.classList.add('answered');
            update();
        });
    });

    // Text inputs
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const currentQuestion = input.parentNode.parentNode;
            const value = input.value.trim();
            const isValid = validateInput(input, value);

            // Add or remove the 'answered' class based on the validity of the input
            if (isValid && !currentQuestion.classList.contains('answered')) {
                currentQuestion.classList.add('answered');
                const questionIndex = Array.from(document.querySelectorAll('.question')).indexOf(currentQuestion);
                const progressSquare = document.getElementById("sq" + questionIndex);
                progressSquare.style.background = "green"; // Update the progress square color to green
            } else if (!isValid && currentQuestion.classList.contains('answered')) {
                currentQuestion.classList.remove('answered');
                const questionIndex = Array.from(document.querySelectorAll('.question')).indexOf(currentQuestion);
                const progressSquare = document.getElementById("sq" + questionIndex);
                progressSquare.style.background = "#9f9f9f"; // Reset the progress square color to default
            }
            update();
        });
    });

    // Range sliders
    sliders.forEach(slider => {
        const sliderValue = slider.parentElement.querySelector('.slider-value');
        slider.addEventListener('input', () => {
            sliderValue.textContent = slider.value;
            let currentQuestion = slider.parentNode;
            while (!currentQuestion.classList.contains('question')) {
                currentQuestion = currentQuestion.parentNode;
            }
            currentQuestion.classList.add('answered');
            update();
        });
    });

    // Submit button
    submitBtn.addEventListener('click', () => {
        // Hide all questions and the submit button after clicking the submit button
        questions.forEach(question => {
            question.style.display = 'none';
        });
        submitBtn.style.display = 'none';
        document.querySelector('.question-counter').style.display = 'none';
    });

    // Back button
    backBtn.addEventListener('click', () => {
        const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
        if (currentQuestionIndex > 0) {
            questions[currentQuestionIndex].style.display = 'none'
            questions[currentQuestionIndex - 1].style.display = 'block'
        }
        update();
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
        if (currentQuestionIndex < questions.length - 1) {
            questions[currentQuestionIndex].style.display = 'none'
            questions[currentQuestionIndex + 1].style.display = 'block'
        }
        update();
    });
});

function update() {
    updateCurrentQuestionBorder();
    updateCounter();
    updateAnsweredViewer();
    updateNextBackButtons();
    validateInput();
}

function refreshPage() {
    window.location.reload();
}
