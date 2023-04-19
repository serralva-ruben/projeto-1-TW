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

function refreshPage(){
    document.getElementById("pageStart").scrollIntoView({behavior: 'smooth'});
    let radio = document.querySelectorAll('input[type="radio"]');
    for(const checked of radio){
        checked.checked = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // window.scrollTo(0, document.body.scrollHeight);
    const questions = document.querySelectorAll('.question');
    for (let i = 1; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }

    const radios = document.querySelectorAll('input[type="radio"]');
    const submitBtn = document.getElementById('submit-btn');
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
            if (nextQuestion !== null) {
                nextQuestion.style.display = 'block';
                // nextQuestion.classList.add("scroll-container");
                nextQuestion.scrollIntoView({behavior: 'smooth', block: 'start'});
            } else {
                submitBtn.style.display = 'block';
            }
        });
    });
    submitBtn.addEventListener('click', () => {
        questions.forEach(question => {
            question.style.display = 'none';
        });
        submitBtn.style.display = 'none';
    });
});