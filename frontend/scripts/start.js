
export function start() {
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