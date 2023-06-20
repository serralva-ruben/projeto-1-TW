import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';



const QuizMenuComponent = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        const response = await fetch('http://localhost:8020/api/quiz/');
        const data = await response.json();
        setQuizzes(data);
    };

    const getQuizBackgroundImage = (quizTitle) => {
        return `url(/media/covers/quizMenu/${quizTitle}_cover.jpg)`
    };

    return (
        <div className="quiz-menu-container">
            <Navbar />
            <ul>
                {quizzes.map((quiz, index) =>
                    <li
                        key={index}
                        style={{
                            backgroundImage: getQuizBackgroundImage(quiz.title),
                        }}
                    >
                        {/* assuming each quiz has a title and id property */}
                        <Link to={`/quiz/${encodeURIComponent(quiz.title)}`}>{quiz.title}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default QuizMenuComponent;
