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
        q14: "a"
        // add correct answers for each question
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
