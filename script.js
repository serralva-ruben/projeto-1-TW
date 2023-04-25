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
        q15: "a"
    };

    let score = 0;
    const questionNames = Object.keys(correctAnswers);

    for (const questionName of questionNames) {
        const answerOptions = document.getElementsByName(questionName);

        for (const option of answerOptions) {
            if (option.checked && option.value == correctAnswers[questionName]) {
                score++;
            }
        }
    }
    alert("Você acertou " + score + " de " + questionNames.length + " perguntas.");
}

function updateCounter() {
    const questions = document.querySelectorAll('.question');
    const counter = document.querySelector('.question-counter');
    console.log(counter + " counter");
    const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
    counter.innerText = `Pergunta: ${currentQuestionIndex + 1} / ${questions.length}`;
}


document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    for (let i = 1; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }

    const radios = document.querySelectorAll('input[type="radio"]');
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const answers = [];

    radios.forEach(radio => {
        radio.addEventListener('click', () => {
            const currentQuestion = radio.parentNode.parentNode;
            const nextQuestion = currentQuestion.nextElementSibling;
            currentQuestion.classList.add('answered');
            const answer = {
                questionId: currentQuestion.getAttribute('id'),
                value: radio.value
            };
            answers.push(answer);
            if (nextQuestion !== null) {nextQuestion.style.display = 'block';} 
            updateCounter();
            currentQuestion.style.display = 'none';
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
        if(currentQuestionIndex>0){
            questions[currentQuestionIndex].style.display = 'none'
            questions[currentQuestionIndex-1].style.display = 'block'
        }
        updateCounter()
    });

    nextBtn.addEventListener('click', () => {
        const currentQuestionIndex = Array.from(document.querySelectorAll('.question')).findIndex(question => question.style.display !== 'none');
        if(currentQuestionIndex<questions.length-1){
            questions[currentQuestionIndex].style.display = 'none'
            questions[currentQuestionIndex+1].style.display = 'block'
        }
        updateCounter()
    });

    updateCounter();
});

