import React from 'react';

const QuestionComponent = ({ question }) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'radio':
        return question.options.map((option, index) => (
          <label key={index}>
            <input type="radio" name={`q${question.id}`} value={option.value} />
            {option.label}
          </label>
        ));
      default:
        return null;
    }
  };

  return (
    <fieldset className="question">
      <legend>{`Pergunta ${question.id}`}</legend>
      <img src={question.image} alt={question.alt} className="question-image" />
      <p>{question.text}</p><br />
      {renderQuestion()}
    </fieldset>
  );
};

export default QuestionComponent;
