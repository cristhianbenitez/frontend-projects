import { configureStore } from '@reduxjs/toolkit';
import { quizSlice } from './features/quizSlice';

export const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
