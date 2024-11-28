import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizState, Question } from '@/types/quiz';

const initialState: QuizState = {
  currentQuestion: 0,
  questions: [],
  score: 0,
  isComplete: false,
  userAnswers: {}
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.currentQuestion = 0;
      state.score = 0;
      state.isComplete = false;
      state.userAnswers = {};
    },
    answerQuestion: (state, action: PayloadAction<string>) => {
      const currentQuestion = state.questions[state.currentQuestion];
      state.userAnswers[state.currentQuestion] = action.payload;

      if (action.payload === currentQuestion.correctAnswer) {
        state.score += 1;
      }

      if (state.currentQuestion === state.questions.length - 1) {
        state.isComplete = true;
      } else {
        state.currentQuestion += 1;
      }
    },
    resetQuiz: () => {
      return initialState;
    },
    setCurrentAnswer: (state, action: PayloadAction<string>) => {
      state.userAnswers[state.currentQuestion] = action.payload;
    },
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestion = action.payload;
    }
  }
});

export const { setQuestions, answerQuestion, resetQuiz, setCurrentAnswer, setCurrentQuestionIndex } = quizSlice.actions;
export default quizSlice.reducer;
