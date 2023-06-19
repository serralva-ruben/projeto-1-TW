import React, { useState, useEffect } from 'react';
import QuestionComponent from './QuestionComponent';
import Navbar from './Navbar';

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
    // this would ideally come from a backend API
    const questions = [
        {
            id: 1,
            type: 'radio',
            image: '../media/covers/q1.jpg',
            alt: 'Queen Band Logo',
            text: 'Quem foi o vocalista da banda Queen?',
            options: [
                { value: 'a', label: 'Freddie Mercury' },
                { value: 'b', label: 'David Bowie' },
                { value: 'c', label: 'Mick Jagger' },
                { value: 'd', label: 'Elton John' },
            ],
        },
        // add the rest of the questions here
    ];

    return (
        <div className="quiz-container" id="pageStart">
            <Navbar/>
            <h1>Quiz sobre música</h1>
            <form style={styles.formStyle}>
                {questions.map((question) => <QuestionComponent key={question.id} question={question} />)}
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
