import React, { useState } from 'react';

const TextInputComponent = ({ question }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <label>{question.text}</label>
            <input type="text" value={value} onChange={handleChange} />
        </div>
    )
}

export default TextInputComponent;
