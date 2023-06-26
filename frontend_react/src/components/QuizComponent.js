import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SliderComponent from './quizComponents/SliderComponent';
import RadioComponent from './quizComponents/RadioComponent';
import SelectComponent from './quizComponents/SelectComponent';
import TextInputComponent from './quizComponents/TextInputComponent';
import CheckboxComponent from './quizComponents/CheckboxComponent';
import Navbar from './Navbar';
import '../style/Buttons.css'
import '../style/Quiz.css'

const QuizComponent = () => {
    const { quizTitle } = useParams();
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showSummary, setShowSummary] = useState(false);
    const [correctedAnswers, setCorrectedAnswers] = useState([])

    useEffect(() => { fetchCurrentQuiz(); }, []);

    const fetchCurrentQuiz = async () => {
        const token = localStorage.getItem('jwt')
        setLoading(true);
        const response = await fetch(`http://localhost:8020/api/quiz/${encodeURIComponent(quizTitle)}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setCurrentQuiz(data);
        setLoading(false);
    };

    const updateAnswer = (questionIndex, answer) => {
        setAnswers({ ...answers, [questionIndex]: answer });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const usernameLocalStorage = JSON.parse(localStorage.getItem('user')).username;
        try {
            const token = localStorage.getItem('jwt')
            const response = await fetch('http://localhost:8020/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: currentQuiz.title,
                    answers,
                    username: usernameLocalStorage
                })
            });
            const data = await response.json();
            console.log(data)
            setCorrectedAnswers(data)
            setShowSummary(true);
            const userResponse = await fetch(`http://localhost:8020/api/user/${usernameLocalStorage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userData = await userResponse.json();
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleNext = () => { if (currentQuestionIndex < currentQuiz.questions.length) setCurrentQuestionIndex(currentQuestionIndex + 1); };

    const handleBack = () => { if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1); };

    const componentMapping = {
        radio: RadioComponent,
        text: TextInputComponent,
        select: SelectComponent,
        checkbox: CheckboxComponent,
        range: SliderComponent
    };

    if (loading) {
        return <div>Carregando o Quiz...</div>
    } else {
        return (
            <div>
                <Navbar />
                <h1>{currentQuiz.title}</h1>
                <form onSubmit={handleSubmit}>
                    {/*Render the correct quiz component */}
                    {currentQuiz.questions.map((question, questionIndex) => {
                        const Component = componentMapping[question.questionType];
                        return (
                            <div key={questionIndex} id="main-div" style={{ display: questionIndex === currentQuestionIndex ? 'block' : 'none' }}>
                                <Component
                                    question={question}
                                    imgPath={`/media/covers/${quizTitle}CoverImgs/q${questionIndex + 1}.jpg`}
                                    onAnswerChange={(answer) => updateAnswer(questionIndex, answer)}
                                    showSummary={showSummary}
                                    correctedAnswers={correctedAnswers}
                                />
                            </div>
                        );
                    })}
                    {!showSummary && <>
                        <div className="buttons-container">
                            <button type="button" onClick={handleBack} disabled={currentQuestionIndex === 0}
                                className="quiz-button"
                            >Back</button>
                            <button type="button" onClick={handleNext} disabled={currentQuestionIndex === currentQuiz.questions.length - 1}
                                className="quiz-button"
                            >Next</button>
                            <button type="submit"
                                className="quiz-button"
                            >Submit</button>
                        </div>

                    </>}
                </form>
                {/*Render the navigation menu on the bottom */}
                {!showSummary && currentQuiz.questions.map((question, questionIndex) => {
                    return (<button key={questionIndex}
                        style={{
                            backgroundColor: answers[questionIndex] ? 'green' : 'grey',
                            borderColor: questionIndex === currentQuestionIndex ? 'blue' : 'grey',
                            borderRadius: '5px',
                            margin: '10px',
                            borderWidth: '4px',
                            width: '4vw',
                            height: '4vw'
                        }}
                        onClick={() => setCurrentQuestionIndex(questionIndex)}>
                        {questionIndex + 1}
                    </button>)
                })}
            </div>
        );
    }
};

export default QuizComponent;
