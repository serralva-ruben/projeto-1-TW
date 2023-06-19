import React, { useState } from 'react';

const RadioComponent = ({ question }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className="question">
            <h2>{question.questionText}</h2>
            {question.answerOptions.map((option, index) => (
                <label key={index}>
                    <input type="radio" name={question.questionText} value={option.answerText} checked={value === option.answerText} onChange={handleChange} />
                    {option.answerText}
                </label>
            ))}
        </div>
    )
}

export default RadioComponent;
