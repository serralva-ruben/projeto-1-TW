import React, { useState } from 'react';
import styles from '../../style/style.js'
import SummaryComponent from '../QuizSummaryComponent.js';

const RadioComponent = ({ question, imgPath, onAnswerChange, showSummary, correctedAnswers }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        onAnswerChange(e.target.value);
    }

    return (
        <div className="question" style={styles.question}>
            {!showSummary && <>
                <h2>{question.questionText}</h2>
                <div id='answersIMGContainer'>
                    <div id='inputDiv'>
                        {question.answerOptions.map((option, index) => (
                            <label key={index}>
                                <input type="radio" name={question.questionText} value={option.answerText} checked={value === option.answerText} onChange={handleChange} />
                                {option.answerText}
                            </label>
                        ))}
                    </div>
                    <img src={imgPath} style={styles.img} />
                </div>
            </>}
            {/*Render the show summary component */}
            {showSummary && <SummaryComponent
                correctedAnswers={correctedAnswers}
            />}
        </div>
    )
}

export default RadioComponent;
