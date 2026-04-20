import { useState, useCallback } from 'react';
import easyQuestions from '../data/quiz_easy.json';
import type { QuizEntry, Choice, QuizPhase } from '../types';

function pickRandom<T>(arr: T[], count: number, excludeId: string): T[] {
  const pool = (arr as (T & { id: string })[]).filter((x) => x.id !== excludeId);
  const result: T[] = [];
  while (result.length < count && pool.length > 0) {
    const i = Math.floor(Math.random() * pool.length);
    result.push(...pool.splice(i, 1));
  }
  return result;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRound(pool: QuizEntry[]) {
  const correct = pool[Math.floor(Math.random() * pool.length)];
  const wrongs = pickRandom<QuizEntry>(pool, 2, correct.id);
  const choices: Choice[] = shuffle([
    { ...correct, isCorrect: true },
    ...wrongs.map((w) => ({ ...w, isCorrect: false })),
  ]);
  return { question: correct, choices };
}

export function useQuiz() {
  const pool = easyQuestions as QuizEntry[];
  const [round, setRound] = useState(() => buildRound(pool));
  const [phase, setPhase] = useState<QuizPhase>('answering');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const answer = useCallback(
    (choiceId: string) => {
      if (phase !== 'answering') return;
      const choice = round.choices.find((c) => c.id === choiceId);
      if (!choice) return;
      setSelectedId(choiceId);
      setPhase('animating');
      setScore((s) => ({
        correct: s.correct + (choice.isCorrect ? 1 : 0),
        total: s.total + 1,
      }));
    },
    [phase, round.choices],
  );

  const onAnimationComplete = useCallback(() => setPhase('revealed'), []);

  const next = useCallback(() => {
    setRound(buildRound(pool));
    setSelectedId(null);
    setPhase('answering');
  }, [pool]);

  const selectedChoice = round.choices.find((c) => c.id === selectedId) ?? null;
  const isCorrect = selectedChoice?.isCorrect ?? false;

  return { round, phase, selectedId, isCorrect, score, answer, onAnimationComplete, next };
}
