import React, { useState } from 'react';
import styles from '../../style/style.js'
import SummaryComponent from '../QuizSummaryComponent.js';

const CheckboxComponent = ({ question, imgPath, onAnswerChange, showSummary, correctedAnswers}) => {
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
            {!showSummary && <>
            <h2>{question.questionText}</h2>
            <div id='inputDiv'>
            {question.answerOptions.map((option, index) => (
                <div key={index}>
                    <label >
                        <input
                            type="checkbox"
                            value={option.answerText}
                            checked={selected.includes(option.answerText)}
                            onChange={handleCheckboxChange}
                        />
                        {option.answerText}                        
                    </label>
                </div>
            ))}
            </div>
            <img src={imgPath} style={styles.img} />
            </>}
            {/*Render the show summary component */}
            {showSummary && <SummaryComponent
                correctedAnswers={correctedAnswers}
            />}
        </div> 
    );
};


export default CheckboxComponent;
