import React, { useState } from 'react';

const SelectComponent = ({ question }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className="question">
            <h2>{question.questionText}</h2>
            <select value={value} onChange={handleChange}>
                {question.answerOptions.map((option, index) => (
                    <option key={index} value={option.answerText}>{option.answerText}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectComponent;
