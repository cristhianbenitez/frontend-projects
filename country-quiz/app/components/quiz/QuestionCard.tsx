'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Question } from '@/types/quiz';
import { quizSlice } from '@/store/features/quizSlice';
import type { RootState } from '@/store/store';

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const dispatch = useDispatch();
  const userAnswers = useSelector((state: RootState) => state.quiz.userAnswers);
  const currentQuestion = useSelector((state: RootState) => state.quiz.currentQuestion);
  const totalQuestions = useSelector((state: RootState) => state.quiz.questions.length);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAnswer = (answer: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    dispatch(quizSlice.actions.setCurrentAnswer(answer));

    setTimeout(() => {
      dispatch(quizSlice.actions.answerQuestion(answer));
      setIsProcessing(false);
    }, 2000);
  };

  const isAnswered = userAnswers[currentQuestion] !== undefined || isProcessing;

  const handleQuestionNavigation = (index: number) => {
    if (index <= currentQuestion || userAnswers[index - 1] !== undefined) {
      dispatch(quizSlice.actions.setCurrentQuestionIndex(index));
    }
  };

  return (
    <div className="max-w-[820px] mx-auto pt-9 pb-16 px-5 rounded-2xl bg-secondary">
      <div className="mb-8 max-w-[502px] mx-auto">
        <h1 className="text-sm font-bold text-center text-gray mb-6">Country Quiz</h1>
        {/* Question number */}
        <div className="flex justify-center items-center max-md:flex-wrap gap-3 mb-8">
          {[...Array(totalQuestions)].map((_, index) => (
            <div
              key={index}
              className={`question-number ${index <= currentQuestion ? 'active' : 'inactive'}
                ${
                  index <= currentQuestion || userAnswers[index - 1] !== undefined
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed'
                }`}
              onClick={() => handleQuestionNavigation(index)}
              role="button"
              tabIndex={0}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <h2 className="text-2xl text-center text-foreground mb-10">{question.question}</h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4 max-w-[502px] mx-auto">
        {question.options.map((option) => {
          const isSelected = userAnswers[currentQuestion] === option;
          const isCorrect = option === question.correctAnswer;

          let buttonClass = 'option-button';
          if (isAnswered) {
            if (isCorrect) buttonClass += ' correct';
            else if (isSelected) buttonClass += ' incorrect';
            buttonClass += ' cursor-not-allowed';
          }

          return (
            <button key={option} onClick={() => handleAnswer(option)} disabled={isAnswered} className={buttonClass}>
              <div className="flex justify-between items-center gap-2">
                <span className="text-lg font-medium text-white block ">{option}</span>
                {isAnswered && (isCorrect || isSelected) && (
                  <span className={`answer-icon ${isCorrect ? 'correct' : 'incorrect'}`}>{isCorrect ? '✓' : '✗'}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
