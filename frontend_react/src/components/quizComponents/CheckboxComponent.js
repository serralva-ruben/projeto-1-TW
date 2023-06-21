import React, { useState } from 'react';
import styles from '../../style/style.js'

const CheckboxComponent = ({ question, imgPath, onAnswerChange }) => {
    const [selected, setSelected] = useState([]);

    const handleCheckboxChange = (e) => {
        let newSelected;
        if (e.target.checked) {
            newSelected = [...selected, e.target.value];
        } else {
            newSelected = selected.filter(item => item !== e.target.value);
        }
        setSelected(newSelected);
        onAnswerChange(newSelected.length > 0 ? newSelected : null);
    };

    return (
        <div className="question" style={styles.question}>
            <h2>{question.questionText}</h2>
            {question.answerOptions.map((option, index) => (
                <div key={index}>
                    <label>
                    <div id='inputDiv'>
                        <input
                            type="checkbox"
                            value={option.answerText}
                            checked={selected.includes(option.answerText)}
                            onChange={handleCheckboxChange}
                        />
                        {option.answerText}
                        </div>
                    </label>
                </div>
            ))}
            <img src={imgPath} style={styles.img}/>
        </div>
    );
};


export default CheckboxComponent;
