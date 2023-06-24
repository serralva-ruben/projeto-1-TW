import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import style from '../../style/style'
import UserWidgetComponent from '../widget/userWidgetComponent'

const QuizMenuComponent = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(scores)

    useEffect(() => {
        const fetchData = async () => {
            await fetchQuizzes();
            setLoading(false)
        };
    
        fetchData();
    }, []);

    const fetchQuizzes = async () => {
        const token = localStorage.getItem('jwt')
        const response = await fetch('http://localhost:8020/api/quiz/',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setQuizzes(data);
        fetchScores(data)
    };

    const fetchScores = async(quizzes) => {
        const token = localStorage.getItem('jwt')
        const scorePromises = quizzes.map(async (quiz) =>{
            const response = await fetch(`http://localhost:8020/api/scores/${quiz.title}/`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const scoreData = await response.json();
            console.log(scoreData)
            return scoreData
        });
        const scoreData = await Promise.all(scorePromises);
        console.log(scoreData)
        setScores(scoreData)
    }

    const getQuizBackgroundImage = (quizTitle) => {
        return `url(/media/covers/quizMenu/${quizTitle}_cover.jpg)`
    };

    if(loading) {
        <h1>Loading ...</h1>
    }
    else return (
        <div className="quiz-menu-container">
            <Navbar />
            <UserWidgetComponent />
            <ul>
                {quizzes.map((quiz, quizIndex) =>
                    <Link style={style.menuText} key={quizIndex} to={`/quiz/${encodeURIComponent(quiz.title)}`}>
                        <li style={{backgroundImage: getQuizBackgroundImage(quiz.title),overflowY: 'auto'}}> 
                            {quiz.title}
                            <div style={style.scoreBoardContainer}>
                            {scores[quizIndex]?.map((score, scoreIndex)=>(
                                <h1 style={style.scoreBoardName}>{score.username} {score.score}/{quiz.questions.length}</h1>              
                            ))}
                            </div>
                        </li>
                    </Link>
                )}
            </ul>
        </div>
    );
};

export default QuizMenuComponent;
