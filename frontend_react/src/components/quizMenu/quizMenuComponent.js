import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import style from '../../style/style'
import UserWidgetComponent from '../widget/userWidgetComponent'

const QuizMenuComponent = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(quizzes)

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
            const response = await fetch(`http://localhost:8020/api/scores/best/${quiz.title}/`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const scoreData = await response.json();
            console.log(scoreData)
            return scoreData
        });
        const scoreData = await Promise.all(scorePromises);
        
        setScores(scoreData)
    }

    const getTotalPoints = (quiz) =>{
        let totalPoints = 0
        quiz.questions.map((question)=>{
            totalPoints += question.questionPoints
        })
        return totalPoints
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
                            <div style= {{display: 'flex', justifyContent: 'space-between'}}>
                                {scores[quizIndex]?.length>0 && //only render the scoreboard if the there are scores to show
                                <div style={style.scoreBoardContainer}>
                                <>Score board</>
                                    {scores[quizIndex]?.map((score, scoreIndex)=>(
                                        <h1 key={scoreIndex} style={style.scoreBoardName}>
                                        <img style={style.badgeIcon} src={scoreIndex===0 ? process.env.PUBLIC_URL + "/media/covers/quizMenu/trophies/gold.png" : scoreIndex===1 ? process.env.PUBLIC_URL + "/media/covers/quizMenu/trophies/silver.png" : process.env.PUBLIC_URL + "/media/covers/quizMenu/trophies/bronze.png"}/>
                                            {scoreIndex+1}º - {score.username} {Math.round(parseFloat(score.score['$numberDecimal']) * quiz.questions.length)}/{quiz.questions.length } - 
                                            Points: {Math.round(getTotalPoints(quiz)*parseFloat(score.score['$numberDecimal']))}/{getTotalPoints(quiz)}</h1>
                                    ))}
                                </div>}
                                <div style={style.scoreBoardContainer}>
                                    <>Quiz info</>
                                    <h1 style={style.scoreBoardName}>Total questions: {quiz.questions.length}</h1>
                                    <h1 style={style.scoreBoardName}>Total points: {getTotalPoints(quiz)}</h1>
                                </div>
                            </div>                            
                        </li>
                    </Link>
                )}
            </ul>
        </div>
    );
};

export default QuizMenuComponent;
