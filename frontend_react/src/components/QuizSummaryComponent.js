import React from 'react';
import styles from '../style/style';

const SummaryComponent = ({correctedAnswers}) => {
  return (
    <div style={styles.summary}>
      {correctedAnswers.map((question)=>(
        <div style={question.correct ? styles.summaryItemCorrect : styles.summaryItemFalse} key={question.question}>
          {question.question}
        </div>
      ))}
    </div>
  );
};

export default SummaryComponent;