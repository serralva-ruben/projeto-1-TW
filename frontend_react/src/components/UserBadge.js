import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../UserContext';
import Navbar from "./Navbar";
import '../style/UserBadge.css';

const UserBadge = () => {
    const [quizzes, setQuizzes] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        const token = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8020/api/quiz', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        const quizMap = data.reduce((map, quiz) => ({ ...map, [quiz.title]: quiz.questions.length }), {});
        setQuizzes(quizMap);
    };

    const getSymbol = (isCorrect) => {
        return isCorrect ? '✔️' : '❌';
    };

    return (
        <div>
            <Navbar />
            <div className="user_results">
                <h2>User Attempts</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Quiz Name</th>
                        <th>Score</th>
                        <th>{getSymbol(true)}</th>
                        <th>{getSymbol(false)}</th>
                        <th>Date and Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.scores.map((attempt) => {
                        const quiz = quizzes[attempt.quizTitle];
                        if (!quiz) { return null; }

                        const totalQuestions = quizzes[attempt.quizTitle];
                        const rightAnswers = Math.round(attempt.score.$numberDecimal * totalQuestions);
                        const wrongAnswers = totalQuestions - rightAnswers;

                        return (
                            <tr key={attempt._id.$oid}>
                                <td>{attempt.quizTitle}</td>
                                <td>{(attempt.score.$numberDecimal * 100).toFixed(2)}%</td>
                                <td>{rightAnswers}</td>
                                <td>{wrongAnswers}</td>
                                <td>{attempt.timestamp ? new Date(attempt.timestamp).toLocaleString() : ''}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserBadge;
