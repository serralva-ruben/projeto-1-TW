import React, { useState } from 'react';
import styles from '../../style/style.js'
import SummaryComponent from '../QuizSummaryComponent.js';

const SliderComponent = ({ question, imgPath, onAnswerChange, showSummary, correctedAnswers }) => {
    const [value, setValue] = useState(0);

    const handleChange = (e) => {
        setValue(e.target.value);
        onAnswerChange(e.target.value);
    }

    return (
        <div className="question" style={styles.question}>
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
                <img src={imgPath} style={styles.img} />
                </div></>}
            {/*Render the show summary component */}
            {showSummary && <SummaryComponent
                correctedAnswers={correctedAnswers}
            />}
        </div>
    )
}


export default SliderComponent;
