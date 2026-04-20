export type Difficulty = 'easy' | 'normal' | 'hard';

export type QuizEntry = {
  id: string;
  description: string;
  command: string;
};

export type Choice = QuizEntry & { isCorrect: boolean };

export type QuizPhase = 'answering' | 'animating' | 'revealed';
