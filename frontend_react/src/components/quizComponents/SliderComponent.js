import React, { useState } from 'react';
import styles from '../../style/style.js'

const SliderComponent = ({ question, imgPath, onAnswerChange }) => {
    const [value, setValue] = useState(0);

    const handleChange = (e) => {
        setValue(e.target.value);
        onAnswerChange(e.target.value);
    }

    return (
        <div className="question" style={styles.question}>
            <h2>{question.questionText}</h2>
            <div id='inputDiv'>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={value}
                    onChange={handleChange}
                />
            </div>
            <img src={imgPath} style={styles.img} />
        </div>
    )
}


export default SliderComponent;
