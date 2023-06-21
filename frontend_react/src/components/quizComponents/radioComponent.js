import React, { useState } from 'react';
import styles from '../../style/style.js'

const RadioComponent = ({ question, imgPath, onAnswerChange }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        onAnswerChange(e.target.value);
    }

    return (
        <div className="question" style={styles.question}>
            <h2>{question.questionText}</h2>
            {question.answerOptions.map((option, index) => (
                <label key={index}>
                    <input type="radio" name={question.questionText} value={option.answerText} checked={value === option.answerText} onChange={handleChange} />
                    {option.answerText}
                </label>
            ))}
            <img src={imgPath} style={styles.img}/>
        </div>
    )
}

export default RadioComponent;
