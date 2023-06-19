import React, { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import Navbar from './Navbar';

const QuizComponent = () => {
    // this would ideally come from a backend API
    const questions = [
        {
            id: 1,
            type: 'radio',
            image: '../media/covers/q1.jpg',
            alt: 'Queen Band Logo',
            text: 'Quem foi o vocalista da banda Queen?',
            options: [
                { value: 'a', label: 'Freddie Mercury' },
                { value: 'b', label: 'David Bowie' },
                { value: 'c', label: 'Mick Jagger' },
                { value: 'd', label: 'Elton John' },
            ],
        },
        // add the rest of the questions here
    ];

    return (
        <div className="quiz-container" id="pageStart">
            <Navbar />
            <h1>Quiz sobre música</h1>
            <form>
                {questions.map((question) => <QuestionComponent key={question.id} question={question} />)}
                {/* Add your bottom bar here */}
            </form>
        </div>
    );
};

export default QuizComponent;
