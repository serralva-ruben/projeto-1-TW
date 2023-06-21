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
        try {
            const response = await fetch('http://localhost:8020/api/verify', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: currentQuiz.title, 
                    answers
                }) 
            });
            const data = await response.json();
            
            // Handle the response data here
            // This could be displaying the results, redirecting the user, etc.
    
            console.log(data);
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
                {currentQuiz.questions.map((question, questionIndex)=>{
                    return(<button key={questionIndex} 
                    style={{ 
                        backgroundColor: answers[questionIndex] ? 'green' : 'grey',
                        borderColor: questionIndex === currentQuestionIndex ? 'blue' : 'grey',
                        borderRadius: '5px',
                        margin: '10px',
                        borderWidth: '4px',
                        width: '4vw',
                        height: '4vw'
                        }}
                        onClick={()=>setCurrentQuestionIndex(questionIndex)}>
                        {questionIndex+1}
                    </button>)
                })}
            </div>
        );
    }
};

export default QuizComponent;
