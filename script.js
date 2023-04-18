function checkAnswers() {
<<<<<<< HEAD
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
=======
    
    let score = 0;
    let q1Answer = document.getElementsByName("q1");
    let q2Answer = document.getElementsByName("q2");
    let q3Answer = document.getElementsByName("q3");
    let q4Answer = document.getElementsByName("q4");
    let q5Answer = document.getElementsByName("q5");
    let q6Answer = document.getElementsByName("q6");
    let q7Answer = document.getElementsByName("q7");
    let q8Answer = document.getElementsByName("q8");
    let q9Answer = document.getElementsByName("q9");
    let q10Answer = document.getElementsByName("q10");
    let q11Answer = document.getElementsByName("q11");
    let q12Answer = document.getElementsByName("q12");
    let q13Answer = document.getElementsByName("q13");
    let q14Answer = document.getElementsByName("q14");
    let q15Answer = document.getElementsByName("q15");

    for (let i=0; i < q1Answer.length; i++) {
      if (q1Answer[i].checked && q1Answer[i].value == "a") {score++;}
      if (q2Answer[i].checked && q2Answer[i].value == "b") {score++;}
      if (q3Answer[i].checked && q3Answer[i].value == "b") {score++;}
      if (q4Answer[i].checked && q4Answer[i].value == "a") {score++;}
      if (q5Answer[i].checked && q5Answer[i].value == "a") {score++;}
      if (q6Answer[i].checked && q6Answer[i].value == "a") {score++;}
      if (q7Answer[i].checked && q7Answer[i].value == "a") {score++;}
      if (q8Answer[i].checked && q8Answer[i].value == "a") {score++;}
      if (q9Answer[i].checked && q9Answer[i].value == "a") {score++;}
      if (q10Answer[i].checked && q10Answer[i].value == "a") {score++;}
      if (q11Answer[i].checked && q11Answer[i].value == "a") {score++;}
      if (q12Answer[i].checked && q12Answer[i].value == "b") {score++;}
      if (q13Answer[i].checked && q13Answer[i].value == "a") {score++;}
      if (q14Answer[i].checked && q14Answer[i].value == "c") {score++;}
      if (q15Answer[i].checked && q15Answer[i].value == "a") {score++;}
    }
    
    alert("Você acertou " + score + " de " + 15 + " perguntas.");
  }
>>>>>>> 864a6d409df16c09500490faedb97dcd65d2b8f2
