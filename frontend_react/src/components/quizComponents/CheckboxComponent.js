import React, { useState } from 'react';
import SummaryComponent from '../QuizSummaryComponent.js';
import '../../style/Quiz.css'

const CheckboxComponent = ({ question, imgPath, onAnswerChange, showSummary, correctedAnswers }) => {
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
        <div className="question">
            {!showSummary && <>
                <h2>{question.questionText}</h2>
                <div id='answersIMGContainer'>
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
                    <img src={imgPath} className='img'/>
                </div>
            </>}
            {/*Render the show summary component */}
            {showSummary && <SummaryComponent
                correctedAnswers={correctedAnswers}
            />}
        </div>
    );
};


export default CheckboxComponent;
