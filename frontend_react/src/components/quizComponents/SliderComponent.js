import React, { useState } from 'react';
import SummaryComponent from '../QuizSummaryComponent.js';
import '../../style/Quiz.css'

const SliderComponent = ({ question, imgPath, onAnswerChange, showSummary, correctedAnswers }) => {
    const [value, setValue] = useState(0);

    const handleChange = (e) => {
        setValue(e.target.value);
        onAnswerChange(e.target.value);
    }

    return (
        <div className="question">
            {!showSummary && <>
                <h2>{question.questionText}</h2>
                <div id='answersIMGContainer'>
                <input
                    type="range"
                    min="0"
                    max="9"
                    value={value}
                    onChange={handleChange}
                />
                <div>{value}</div>
                <img src={imgPath} className='img' />
                </div></>}
            {/*Render the show summary component */}
            {showSummary && <SummaryComponent
                correctedAnswers={correctedAnswers}
            />}
        </div>
    )
}


export default SliderComponent;
