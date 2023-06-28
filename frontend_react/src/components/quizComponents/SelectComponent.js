import React, { useState } from 'react';
import SummaryComponent from '../QuizSummaryComponent.js';
import '../../style/Quiz.css'


const SelectComponent = ({ question, imgPath, onAnswerChange, showSummary, correctedAnswers }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        onAnswerChange(e.target.value);
    }

    return (
        <div className="question">
            {!showSummary && <>
                <h2>{question.questionText}</h2>
                <div id='answersIMGContainer'>
                    <select value={value} onChange={handleChange}>
                        <option value=" "></option>
                        {question.answerOptions.map((option, index) => (
                            <option key={index} value={option.answerText}>{option.answerText}</option>
                        ))}
                    </select>
                    <img src={imgPath} className="img" />
                </div>
            </>}
            {/*Render the show summary component */}
            {showSummary && <SummaryComponent
                correctedAnswers={correctedAnswers}
            />}
        </div>
    )
}

export default SelectComponent;
