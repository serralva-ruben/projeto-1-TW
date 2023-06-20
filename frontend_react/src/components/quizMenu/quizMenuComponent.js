import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
const QuizMenuComponent = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        const response = await fetch('http://localhost:8020/api/quiz/'); // replace with your actual API endpoint
        const data = await response.json();
        setQuizzes(data);
    };

    return (
        <div className="quiz-menu-container">
            <Navbar/>
            <h1>Select a Quiz</h1>
            <ul>
                {quizzes.map((quiz, index) => 
                    <li key={index}>
                        {/* assuming each quiz has a title and id property */}
                        <Link to={`/quiz/${encodeURIComponent(quiz.title)}`}>{quiz.title}</Link> 
                    </li>
                )}
            </ul>
        </div>
    );
};

export default QuizMenuComponent;
