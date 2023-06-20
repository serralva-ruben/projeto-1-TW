import React, { useState } from 'react';
import styles from '../../style/style.js'

const CheckboxComponent = ({ question, imgPath }) => {
    const [selected, setSelected] = useState([]);

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setSelected([...selected, e.target.value]);
        } else {
            setSelected(selected.filter(item => item !== e.target.value));
        }
    };

    return (
        <div className="question" style={styles.question}>
            <h2>{question.questionText}</h2>
            {question.answerOptions.map((option, index) => (
                <div key={index}>
                    <label>
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
            <img src={imgPath} style={styles.img}/>
        </div>
    );
};


export default CheckboxComponent;
