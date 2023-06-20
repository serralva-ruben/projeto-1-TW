import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SliderComponent from './quizComponents/SliderComponent';
import RadioComponent from './quizComponents/RadioComponent';
import SelectComponent from './quizComponents/SelectComponent';
import TextInputComponent from './quizComponents/TextInputComponent';
import CheckboxComponent from './quizComponents/CheckboxComponent';
import styles from '../style/style.js'

const QuizComponent = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        const response = await fetch('http://localhost:8020/api/quiz/'); // replace with your actual API endpoint
        const data = await response.json();
        setQuizzes(data);
    };

    const updateAnswer = (questionIndex, answer) => {
        setAnswers({
            ...answers,
            [questionIndex]: answer
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // here you would probably send the answers object to your API for evaluation
        // const response = await fetch('http://localhost:8020/api/quiz/submit', { method: 'POST', body: JSON.stringify(answers) });
        console.log(answers);
    };

    const componentMapping = {
        radio: RadioComponent,
        text: TextInputComponent,
        select: SelectComponent,
        checkbox: CheckboxComponent,
        range: SliderComponent
    };

    return (
        <div className="quiz-container" id="pageStart">
            <Navbar/>
            <h1>Quiz sobre música</h1>
            <form style={styles.formStyle} onSubmit={handleSubmit}>
                {quizzes.map((quiz, quizIndex) =>
                    quiz.questions.map((question, questionIndex) => {
                        const Component = componentMapping[question.questionType];
                        if (Component) {
                            return (
                                <Component 
                                    key={`${quizIndex}-${questionIndex}`} 
                                    question={question} 
                                    onAnswerChange={(answer) => updateAnswer(questionIndex, answer)}
                                />
                            );
                        } else {
                            // Log an error, render a fallback UI, or do nothing.
                            console.error(`No component found for question type: ${question.questionType}`);
                            return null;
                        }
                    })
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default QuizComponent;
