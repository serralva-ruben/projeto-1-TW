import React, { useState } from 'react';
import styles from '../../style/style.js'
import '../../style/App.css'

const SelectComponent = ({ question, imgPath, onAnswerChange }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        onAnswerChange(e.target.value);
    }

    return (
        <div className="question" style={styles.question}>
            <h2>{question.questionText}</h2>
            <select value={value} onChange={handleChange}>
                {question.answerOptions.map((option, index) => (
                    <option key={index} value={option.answerText}>{option.answerText}</option>
                ))}
            </select>
            <img src={imgPath} style={styles.img} className="question-image"/>
        </div>
    )
}

export default SelectComponent;
