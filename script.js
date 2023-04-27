function checkAnswers() {
    const correctAnswers = {
        q1: "a",
        q2: "b",
        q3: "b",
        q4: "a",
        q5: "a",
        q6: "a",
        q7: "a",
        q8: "a",
        q9: "a",
        q10: "a",
        q11: "b",
        q12: "a",
        q13: "c",
        q14: "a",
        q15: "a",
        q16: ["a", "b"],
        q17: ["a", "c", "d"],
        q18: ["a", "c"],
        q19: "b",
        q20: "b"
    };

    let score = 0;
    const questionNames = Object.keys(correctAnswers);

    for (const questionName of questionNames) {
        const answerInputs = document.getElementsByName(questionName);
        let correctCount = 0;

        for (const input of answerInputs) {
            if (input.type === "radio" && input.checked && input.value == correctAnswers[questionName]) {
                correctCount++;
            } else if (input.type === "checkbox" && input.checked && correctAnswers[questionName].includes(input.value)) {
                correctCount++;
            } else if (input.type === "select-one" && input.value == correctAnswers[questionName]) {
                correctCount++;
            }
        }
        if (correctCount > 0) {
            score++;
        }
    }
    alert("Você acertou " + score + " de " + questionNames.length + " perguntas.");
}

function start(){

    const questions = document.querySelectorAll('.question');
    const progressDiv = document.getElementById('progress')
    for (let i=0; i<questions.length;i++){
        progressDiv.innerHTML += "<div c lass='progressSquare' id='sq"+i+"'>Q"+(i+1)+"</div>"
    }
    for (let i=0; i<questions.length;i++){
        document.getElementById("sq"+i).addEventListener('click', ()=>{
            const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
            questions[currentQuestionIndex].style.display = 'none';
            questions[i].style.display = 'block';
            updateAnsweredViewer()
            updateCounter()
        })
    }
}

function updateAnsweredViewer(){
    let squareDivs = []
    for(let i=0;i<document.querySelectorAll('.question').length;i++){
        squareDivs[i] = document.getElementById("sq"+i)
        if(document.querySelectorAll('.question')[i].classList.contains('answered')){squareDivs[i].style.background = "green";}
        else squareDivs[i].style.background = "red";
    }
}

function updateCounter() {
    const questions = document.querySelectorAll('.question');
    const counter = document.querySelector('.question-counter');
    const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
    counter.innerText = `Pergunta: ${currentQuestionIndex + 1} / ${questions.length}`;
}


document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
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
        radio.addEventListener('click', () => {
            const currentQuestion = radio.parentNode.parentNode;
            const nextQuestion = currentQuestion.nextElementSibling;
            currentQuestion.classList.add('answered');
            if (nextQuestion !== null) { currentQuestion.style.display = 'none'; nextQuestion.style.display = 'block'; }
            updateCounter();
            updateAnsweredViewer()
        });
    });
    //some adjustments needed
    checkboxes.forEach(cb => {
        cb.addEventListener('click', () => {
            const currentQuestion = cb.parentNode.parentNode;
            const nextQuestion = currentQuestion.nextElementSibling;
            currentQuestion.classList.add('answered');
            if (nextQuestion !== null) { currentQuestion.style.display = 'none'; nextQuestion.style.display = 'block'; }
            updateCounter();
            updateAnsweredViewer()
        });
    });

    selections.forEach(dropdown => {
        dropdown.addEventListener('change', () => {
            const currentQuestion = dropdown.parentNode;
            const nextQuestion = currentQuestion.nextElementSibling;
            currentQuestion.classList.add('answered');
            if (nextQuestion !== null) { currentQuestion.style.display = 'none'; nextQuestion.style.display = 'block'; }
            updateCounter();
            updateAnsweredViewer()
        });
    });

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const currentQuestion = input.parentNode.parentNode;
            if(input.value.length>0 && !currentQuestion.classList.contains('answered')) {currentQuestion.classList.add('answered');}
            else if(input.value.length===0 && currentQuestion.classList.contains('answered')) {currentQuestion.classList.remove('answered')}
            updateCounter();
            updateAnsweredViewer()
        });
    });

    sliders.forEach(slider => {
        slider.addEventListener('input', () => {
            const currentQuestion = slider.parentNode;
            currentQuestion.classList.add('answered');
            updateCounter();
            updateAnsweredViewer()
        });
    });
    
    submitBtn.addEventListener('click', () => {
        questions.forEach(question => {
            question.style.display = 'none';
        });
        submitBtn.style.display = 'none';
        document.querySelector('.question-counter').style.display = 'none';
    });

    backBtn.addEventListener('click', () => {
        const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
        if (currentQuestionIndex > 0) {
            questions[currentQuestionIndex].style.display = 'none'
            questions[currentQuestionIndex - 1].style.display = 'block'
        }
        updateCounter()
        updateAnsweredViewer()
    });

    nextBtn.addEventListener('click', () => {
        const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
        if (currentQuestionIndex < questions.length - 1) {
            questions[currentQuestionIndex].style.display = 'none'
            questions[currentQuestionIndex + 1].style.display = 'block'
        }
        updateCounter()
        updateAnsweredViewer()
    });
    updateCounter();
});
