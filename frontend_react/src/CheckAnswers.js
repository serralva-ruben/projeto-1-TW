import React, { useState } from 'react';

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

function useCheckAnswers(answers) {
    const [score, setScore] = useState(0);
    const [result, setResult] = useState({});

    useEffect(() => {
        let newScore = 0;
        const newResult = {};

        for (const questionName in correctAnswers) {
            const userAnswer = answers[questionName];
            const correctAnswer = correctAnswers[questionName];
            const isCorrect = Array.isArray(correctAnswer) ?
                correctAnswer.includes(userAnswer) :
                userAnswer === correctAnswer;

            newResult[questionName] = isCorrect;
            if (isCorrect) {
                newScore++;
            }
        }

        setScore(newScore);
        setResult(newResult);
    }, [answers]);

    const submit = async () => {
        const data = {
            result: JSON.stringify(result),
            score: score
        };

        try {
            const response = await fetch('http:localhost:8020/api/users/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const responseData = await response.json();
            console.log('Success:', responseData);
            // Handle successful submission here, e.g., redirect to a summary page
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return { result, score, submit };
}
