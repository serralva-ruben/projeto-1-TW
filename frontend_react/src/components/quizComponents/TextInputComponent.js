import React, { useState } from 'react';
import SummaryComponent from '../QuizSummaryComponent.js';
import '../../style/Quiz.css'

const TextInputComponent = ({ question, imgPath, onAnswerChange, showSummary, correctedAnswers }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        onAnswerChange(e.target.value)
    }

    return (
        <div className="question">
            {!showSummary && <>
                <h2>{question.questionText}</h2>
                <div id='answersIMGContainer'>
                <div id='inputDiv'>
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder="Answer here"
                    />
                </div>
                <img src={imgPath} className='img'/>
                </div></>}
            {/*Render the show summary component */}
            {showSummary && <SummaryComponent
                correctedAnswers={correctedAnswers}
            />}
        </div>
    )
}

export default TextInputComponent;
