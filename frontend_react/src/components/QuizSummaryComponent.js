import React from 'react';

const SummaryComponent = ({correctedAnswers}) => {
  return (
    <div>
      {correctedAnswers.map((question)=>(
        <div key={question.question}>
          {question.question.toString()+" "+question.correct}
        </div>
      ))}
    </div>
  );
};

export default SummaryComponent;