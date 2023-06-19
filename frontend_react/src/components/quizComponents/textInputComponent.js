import React, { useState } from 'react';

const TextInputComponent = ({ question }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className="question">
            <h2>{question.questionText}</h2>
            <input
                type="text"
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

export default TextInputComponent;
