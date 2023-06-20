import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import style from '../../style/style'


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
                    <Link style={style.menuText} key={index} to={`/quiz/${encodeURIComponent(quiz.title)}`}>
                        <li style={{backgroundImage: getQuizBackgroundImage(quiz.title)}}> {quiz.title}</li>
                    </Link>
                )}
            </ul>
        </div>
    );
};

export default QuizMenuComponent;
