'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { quizSlice } from '@/store/features/quizSlice';
import type { RootState } from '@/store/store';
import Image from 'next/image';
import Confetti from './congrats.svg';

export default function ResultsPage() {
  const dispatch = useDispatch();
  const { score, questions } = useSelector((state: RootState) => state.quiz);

  const handlePlayAgain = () => {
    dispatch(quizSlice.actions.resetQuiz());
  };

  return (
    <div className="max-w-[400px] w-full mx-auto bg-dark rounded-xl px-5 pt-4 pb-[3.875rem] text-center">
      <Image src={Confetti} alt="Celebration" width={100} height={100} className="mx-auto w-full h-full mb-3" />

      <h1 className="text-2xl font-medium mb-4 max-w-[320px] mx-auto">Congrats! You completed the quiz!</h1>

      <div className="mb-12">
        You answer <span>{score}</span>/<span>{questions.length}</span> correctly
      </div>
      <Link
        href="/"
        onClick={handlePlayAgain}
        className="gradient-button inline-block hover:opacity-90 transform hover:scale-105 transition-all w-full max-w-[240px] mx-auto"
      >
        Play Again
      </Link>
    </div>
  );
}
