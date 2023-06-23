import React, { useState } from 'react';
import styles from '../../style/style.js'
import SummaryComponent from '../QuizSummaryComponent.js';

const TextInputComponent = ({ question, imgPath, onAnswerChange, showSummary, correctedAnswers }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        onAnswerChange(e.target.value)
    }

    return (
        <div className="question" style={styles.question}>
            {!showSummary && <>
                <h2>{question.questionText}</h2>
                <div id='answersIMGContainer'>
                <div id='inputDiv'>
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                    />
                </div>
                <img src={imgPath} style={styles.img} />
                </div></>}
            {/*Render the show summary component */}
            {showSummary && <SummaryComponent
                correctedAnswers={correctedAnswers}
            />}
        </div>
    )
}

export default TextInputComponent;
