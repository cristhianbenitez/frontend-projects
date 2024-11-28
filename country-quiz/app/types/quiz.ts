export interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];
  imageUrl?: string;
}

export interface QuizState {
  currentQuestion: number;
  questions: Question[];
  score: number;
  isComplete: boolean;
  userAnswers: Record<number, string>;
}
