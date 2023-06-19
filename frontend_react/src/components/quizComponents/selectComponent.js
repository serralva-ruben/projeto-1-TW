import React, { useState } from 'react';

const SelectComponent = ({ question }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <label>{question.text}</label>
            <select value={value} onChange={handleChange}>
                {question.options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectComponent;
