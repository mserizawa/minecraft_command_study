import { useState } from 'react';
import { TopScreen } from './components/TopScreen';

type Difficulty = 'easy' | 'normal' | 'hard';
type Screen = 'top' | 'quiz';

export default function App() {
  const [screen, setScreen] = useState<Screen>('top');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const handleSelect = (d: Difficulty) => {
    setDifficulty(d);
    setScreen('quiz');
  };

  if (screen === 'quiz') {
    return (
      <div className="min-h-svh flex items-center justify-center bg-[#1a1a1a]">
        <div className="font-minecraft text-white text-center">
          <p className="text-[12px] text-[#FFFF55] mb-4">difficulty: {difficulty}</p>
          <button
            className="mc-button px-6 py-3 text-[11px]"
            onClick={() => setScreen('top')}
          >
            もどる
          </button>
        </div>
      </div>
    );
  }

  return <TopScreen onSelect={handleSelect} />;
}
