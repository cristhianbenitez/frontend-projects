'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { countriesApi } from '@/lib/api/countries';
import { generateQuestions } from '@/lib/utils/quiz-generator';
import { quizSlice } from '@/store/features/quizSlice';
import type { RootState } from '@/store/store';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { questions, currentQuestion, isComplete } = useSelector((state: RootState) => state.quiz);

  const {
    data: countries,
    isLoading,
    error
  } = useQuery({
    queryKey: ['countries'],
    queryFn: countriesApi.getAllCountries
  });

  useEffect(() => {
    if (countries) {
      const generatedQuestions = generateQuestions(countries);
      dispatch(quizSlice.actions.setQuestions(generatedQuestions));
    }
  }, [countries, dispatch]);

  useEffect(() => {
    if (isComplete) {
      router.push('/results');
    }
  }, [isComplete, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading questions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error loading questions</div>
      </div>
    );
  }

  return (
    <div className="max-w-[820px]  md:max-h-[440px] mx-8 w-full md:mx-auto bg-dark rounded-xl">
      {questions[currentQuestion] && <QuestionCard question={questions[currentQuestion]} />}
    </div>
  );
}
