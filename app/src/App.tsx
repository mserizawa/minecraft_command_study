import { useState } from 'react';
import { TopScreen } from './components/TopScreen';
import { QuizScreen } from './components/QuizScreen';
import type { Difficulty } from './types';

type Screen = 'top' | 'quiz';

export default function App() {
  const [screen, setScreen] = useState<Screen>('top');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const handleSelect = (d: Difficulty) => {
    setDifficulty(d);
    setScreen('quiz');
  };

  if (screen === 'quiz') {
    return <QuizScreen difficulty={difficulty} onBack={() => setScreen('top')} />;
  }

  return <TopScreen onSelect={handleSelect} />;
}
