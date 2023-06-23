import React, { useState } from 'react';
import styles from '../../style/style.js'
import '../../style/App.css'
import SummaryComponent from '../QuizSummaryComponent.js';

const SelectComponent = ({ question, imgPath, onAnswerChange, showSummary, correctedAnswers }) => {
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
                    <select value={value} onChange={handleChange}>
                        {question.answerOptions.map((option, index) => (
                            <option key={index} value={option.answerText}>{option.answerText}</option>
                        ))}
                    </select>
                    <img src={imgPath} style={styles.img} className="question-image" />
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
