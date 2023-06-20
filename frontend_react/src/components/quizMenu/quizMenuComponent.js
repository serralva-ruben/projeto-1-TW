import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import musicBackgroundImage from '../../media/covers/music_cover.jpg'
import literatureBackgroundImage from '../../media/covers/literature_cover.jpg';
import moviesBackgroundImage from '../../media/covers/movie_cover.jpg'



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
        switch (quizTitle) {
            case 'Quiz sobre música':
                return `url(${musicBackgroundImage})`;
            case 'Quiz about Literature':
                return `url(${literatureBackgroundImage})`;
            case 'Quiz about Movies':
                return `url(${moviesBackgroundImage})`;
            default:
                return '';
        }
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
