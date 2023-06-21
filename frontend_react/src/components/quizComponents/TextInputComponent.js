import React, { useState } from 'react';
import styles from '../../style/style.js'

const TextInputComponent = ({ question, imgPath, onAnswerChange }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        onAnswerChange(e.target.value)
    }

    return (
        <div className="question" style={styles.question}>
            <h2>{question.questionText}</h2>
            <div id='inputDiv'>
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                />
            </div>
            <img src={imgPath} style={styles.img} />
        </div>
    )
}

export default TextInputComponent;
