'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { quizSlice } from '@/store/features/quizSlice';
import type { RootState } from '@/store/store';

export default function ResultsPage() {
  const dispatch = useDispatch();
  const { score, questions } = useSelector((state: RootState) => state.quiz);

  const handlePlayAgain = () => {
    dispatch(quizSlice.actions.resetQuiz());
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-[820px] w-full mx-auto bg-dark rounded-xl px-8 py-12 text-center">
        <div className="celebration-icon mx-auto">
          <span className="text-4xl">🎉</span>
        </div>

        <h1 className="text-3xl font-semibold mb-6">
          Quiz Complete!
        </h1>

        <div className="text-xl mb-8">
          You scored <span className="font-bold text-2xl">{score}</span> out of <span className="font-bold text-2xl">{questions.length}</span>
        </div>

        <div className="text-lg mb-12">
          {score === questions.length ? (
            "Perfect score! You're a geography expert! 🏆"
          ) : score >= questions.length * 0.7 ? (
            "Great job! You know your geography well! 🌟"
          ) : score >= questions.length * 0.5 ? (
            "Good effort! Keep learning! 📚"
          ) : (
            "Keep practicing to improve your score! 💪"
          )}
        </div>

        <Link
          href="/"
          onClick={handlePlayAgain}
          className="gradient-button inline-block hover:opacity-90 transform hover:scale-105 transition-all"
        >
          Play Again
        </Link>
      </div>
    </main>
  );
}
