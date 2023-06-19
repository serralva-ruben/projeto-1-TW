import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SliderComponent from './quizComponents/SliderComponent';
import RadioComponent from './quizComponents/RadioComponent';
import SelectComponent from './quizComponents/SelectComponent';
import TextInputComponent from './quizComponents/TextInputComponent';
import CheckboxComponent from './quizComponents/CheckboxComponent';

const QuizComponent = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        const response = await fetch('http://localhost:8020/api/quiz/'); // replace with your actual API endpoint
        const data = await response.json();
        setQuizzes(data);
    };

    const components = {
        radio: RadioComponent,
        text: TextInputComponent,
        select: SelectComponent,
        checkbox: CheckboxComponent
    };

    return (
        <div className="quiz-container" id="pageStart">
            <Navbar/>
            <h1>Quiz sobre música</h1>
            <form style={styles.formStyle}>
                {quizzes.map((quiz, quizIndex) =>
                    quiz.questions.map((question, questionIndex) => {
                        const Component = components[question.type];
                        if (Component) {
                            return <Component key={`${quizIndex}-${questionIndex}`} question={question} />;
                        } else {
                            // Log an error, render a fallback UI, or do nothing.
                            console.error(`No component found for question type: ${question.type}`);
                            return null;
                        }
                    })
                )}
                {/* Add your bottom bar here */}
            </form>
        </div>
    );
};

const styles = {
    formStyle: {
        margin: '10vw',
        padding: '5vw',
    }
}

export default QuizComponent;
