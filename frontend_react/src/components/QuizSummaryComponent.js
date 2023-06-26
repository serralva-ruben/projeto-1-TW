import React from 'react';
import '../style/Summary.css'
import { Link } from 'react-router-dom';

const SummaryComponent = ({ correctedAnswers }) => {
  return (
    <div id='summaryContainer'>
      <div id='summaryItems'>
        {correctedAnswers.map((question) => (
          <div style={question.correct ? styles.summaryItemCorrect : styles.summaryItemFalse} key={question.question}>
            {question.question}
          </div>
        ))}
      </div>
      <Link id='summaryButton' to="/" >Go back Home</Link>
    </div>
  );
};

export default SummaryComponent;

const styles = {
  summaryItemCorrect: {
    margin: '2rem',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: '5px',
    borderWidth: '1px',
    padding: '10px',
    backgroundColor: 'green',
    aspectRatio: '1',
    height: '2rem',

  },
  summaryItemFalse: {
    margin: '2rem',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: '5px',
    borderWidth: '1px',
    padding: '10px',
    backgroundColor: 'red',
    aspectRatio: '1',
    height: '2rem',
  }
}