// import { correctAnswers } from "../script.js";
// import { start } from "./start.js";

// function checkAnswers() {

//     let score = 0;
//     const questionNames = Object.keys(correctAnswers);

//     for (const questionName of questionNames) {
//         const answerInputs = document.getElementsByName(questionName);
//         let correctCount = 0;

//         for (const input of answerInputs) {
//             const isInputCorrect = checkInputCorrectness(input, questionName, correctAnswers);
//             if (isInputCorrect) {
//                 correctCount++;
//             }
//         }
//         if (correctCount > 0) {
//             score++;
//         }
//     }
//     alert(`Acertaste em ${score} de ${questionNames.length} perguntas.`);
// }

// function checkInputCorrectness(input, questionName, correctAnswers) {
//     const inputType = input.type;
//     const inputValue = input.value;
//     const correctAnswer = correctAnswers[questionName];

//     if (
//         (inputType === "radio" && input.checked && inputValue === correctAnswer) ||
//         (inputType === "checkbox" && input.checked && correctAnswer.includes(inputValue)) ||
//         (inputType === "select-one" && inputValue === correctAnswer) ||
//         (inputType === "text" && inputValue.toLowerCase() === correctAnswer) ||
//         (inputType === "range" && inputValue === correctAnswer)
//     )
//         return true;
// }

// document.addEventListener('DOMContentLoaded', () => {
//     checkAnswers();
//     start();
// });
