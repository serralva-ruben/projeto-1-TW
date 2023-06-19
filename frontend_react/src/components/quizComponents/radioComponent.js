import React, { useState } from 'react';

const RadioComponent = ({ question }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <label>{question.text}</label>
            {question.options.map((option, index) => (
                <label key={index}>
                    <input type="radio" value={option.value} checked={value === option.value} onChange={handleChange} />
                    {option.label}
                </label>
            ))}
        </div>
    )
}

export default RadioComponent;
