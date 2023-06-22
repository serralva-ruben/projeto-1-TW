import React from 'react';
import styles from '../style/style';
import {Link} from 'react-router-dom';

const SummaryComponent = ({correctedAnswers}) => {
  return (
    <div style={styles.summaryContainer}>
      <div style={styles.summaryItems}>
        {correctedAnswers.map((question)=>(
          <div style={question.correct ? styles.summaryItemCorrect : styles.summaryItemFalse} key={question.question}>
            {question.question}
          </div>
        ))}
      </div>
      <Link style={styles.summaryButton} to="/" >Go back Home</Link>
    </div>
  );
};

export default SummaryComponent;