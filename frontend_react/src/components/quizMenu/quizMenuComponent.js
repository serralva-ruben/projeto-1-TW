import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../style/Menu.css'
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

    function getImage(scoreIndex) {
        switch(scoreIndex) {
          case 0:
            return "/media/covers/quizMenu/trophies/gold.png";
          case 1:
            return "/media/covers/quizMenu/trophies/silver.png";
          case 2:
            return "/media/covers/quizMenu/trophies/bronze.png";
          default:
            return null;
        }
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
                    <Link id='menu-text' key={quizIndex} to={`/quiz/${encodeURIComponent(quiz.title)}`}>
                        <li style={{backgroundImage: getQuizBackgroundImage(quiz.title),overflowY: 'auto',height:'11rem'}} className='listItems'> 
                            {quiz.title}
                            <div className='div-flex'>
                                {scores[quizIndex]?.length>0 && //only render the scoreboard if the there are scores to show
                                <div className='score-board-container'>
                                <h5 className='score-board-title'>Score board</h5>
                                    {scores[quizIndex]?.map((score, scoreIndex)=>(
                                        <h1 key={scoreIndex} className='score-board-name'>
                                        {(0<=scoreIndex && scoreIndex<=2) && <img id='badge-icon' src={getImage(scoreIndex)}/>}
                                            {scoreIndex+1}º - {score.username} {Math.round(parseFloat(score.score['$numberDecimal']) * quiz.questions.length)}/{quiz.questions.length } - 
                                            Points: {Math.round(getTotalPoints(quiz)*parseFloat(score.score['$numberDecimal']))}/{getTotalPoints(quiz)}</h1>
                                    ))}
                                </div>}
                                <div className='score-board-container'>
                                    <h5 className='score-board-title'>Quiz info</h5>
                                    <h1 className='score-board-name'>Total questions: {quiz.questions.length}</h1>
                                    <h1 className='score-board-name'>Total points: {getTotalPoints(quiz)}</h1>
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
