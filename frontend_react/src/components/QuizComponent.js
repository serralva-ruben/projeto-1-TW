import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SliderComponent from './quizComponents/SliderComponent';
import RadioComponent from './quizComponents/RadioComponent';
import SelectComponent from './quizComponents/SelectComponent';
import TextInputComponent from './quizComponents/TextInputComponent';
import CheckboxComponent from './quizComponents/CheckboxComponent';
import Navbar from './Navbar';
import '../style/Buttons.css'
import '../style/App.css'

const QuizComponent = () => {
    const { quizTitle } = useParams();
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchCurrentQuiz(); }, []);

    const fetchCurrentQuiz = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:8020/api/quiz/${encodeURIComponent(quizTitle)}`);
        const data = await response.json();
        setCurrentQuiz(data);
        setLoading(false);
    };

    const updateAnswer = (questionIndex, answer) => {
        setAnswers({ ...answers, [questionIndex]: answer });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // here you would probably send the answers object to your API for evaluation
        // const response = await fetch('http://localhost:8020/api/quiz/submit', { method: 'POST', body: JSON.stringify(answers) });
        console.log(answers);
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
            <div className="quiz-container" id="pageStart">
                <Navbar />
                <h1>{currentQuiz.title}</h1>
                <form onSubmit={handleSubmit}>
                    {currentQuiz.questions.map((question, questionIndex) => {
                        const Component = componentMapping[question.questionType];
                        return (
                            <div key={questionIndex} style={{ display: questionIndex === currentQuestionIndex ? 'block' : 'none' }}>
                                <Component
                                    question={question}
                                    imgPath={`/media/covers/${quizTitle}CoverImgs/q${questionIndex+1}.jpg`}
                                    onAnswerChange={(answer) => updateAnswer(questionIndex, answer)}
                                />
                            </div>
                        );
                    })}
                    <button type="button" onClick={handleBack} disabled={currentQuestionIndex === 0}
                        className="quiz-button"
                    >Back</button>
                    <button type="button" onClick={handleNext} disabled={currentQuestionIndex === currentQuiz.questions.length - 1}
                        className="quiz-button"
                    >Next</button>
                    <button type="submit"
                        className="quiz-button"
                    >Submit</button>
                </form>
            </div>
        );
    }
};

export default QuizComponent;
