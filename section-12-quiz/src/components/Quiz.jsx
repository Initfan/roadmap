import React, { useState, useCallback, useRef } from 'react'

import Questions from '../components/Question';
import QUESTIONS from '../questions'
import Summary from './Summary';

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function (selectedAnswer) {
        setUserAnswers(prev => [...prev, selectedAnswer])
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(answer), [handleSelectAnswer])

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} />
    }

    return (
        <div id="quiz">
            <Questions
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}

export default Quiz