import { useQuiz } from '../hooks/useQuiz';
import { ResultOverlay } from './ResultOverlay';
import type { Difficulty } from '../types';

type Props = {
  difficulty: Difficulty;
  onBack: () => void;
};

export function QuizScreen({ onBack }: Props) {
  const { round, phase, selectedId, isCorrect, score, answer, onAnimationComplete, next } =
    useQuiz();

  const { question, choices } = round;

  return (
    <div className="relative min-h-svh flex flex-col bg-[#1a1a1a] overflow-hidden">
      {/* 背景グリッド */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 16px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 16px)
          `,
        }}
      />

      {/* 上部バー */}
      <div className="relative z-10 w-full">
        <div className="h-2 bg-[#5a8a3c] shadow-[0_2px_0_#2a4a1c]" />
        <div className="flex items-center justify-between px-4 py-3">
          <button className="mc-button px-3 py-2" onClick={onBack}>
            <span className="font-minecraft text-[10px]">← もどる</span>
          </button>
          <div className="mc-panel px-4 py-2">
            <span className="font-minecraft text-[11px] text-[#FFFF55]">
              {score.correct} / {score.total}
            </span>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 py-4 w-full max-w-xl mx-auto flex-1">

        {/* お題パネル */}
        <div className="mc-panel w-full p-5">
          <p className="font-minecraft text-[#aaaaaa] text-[9px] mb-3 tracking-wide">お題</p>
          <p
            className="font-minecraft text-white text-center leading-loose"
            style={{ fontSize: 'clamp(13px, 3.5vw, 18px)' }}
          >
            {question.description}
          </p>
        </div>

        {/* 選択肢ボタン */}
        <div className="flex flex-col gap-3 w-full">
          {choices.map((choice) => {
            const isSelected = choice.id === selectedId;
            const showResult = phase === 'revealed' || phase === 'animating';

            let btnClass = 'mc-button';
            if (showResult) {
              if (choice.isCorrect) {
                btnClass = 'mc-button mc-button-choice-correct';
              } else if (isSelected) {
                btnClass = 'mc-button mc-button-choice-wrong-selected';
              } else {
                btnClass = 'mc-button mc-button-choice-wrong';
              }
            }

            return (
              <button
                key={choice.id}
                className={`${btnClass} w-full px-4 py-5 flex flex-col items-center gap-2`}
                onClick={() => answer(choice.id)}
                disabled={phase !== 'answering'}
              >
                <span
                  className="font-minecraft text-white tracking-wide"
                  style={{ fontSize: 'clamp(14px, 3.5vw, 20px)' }}
                >
                  {choice.command}
                </span>
                {/* 不正解の説明：revealed のときだけ表示 */}
                {phase === 'revealed' && !choice.isCorrect && (
                  <span className="font-minecraft text-[10px] text-white/60 leading-loose mt-1">
                    → {choice.description}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* つぎへボタン */}
        {phase === 'revealed' && (
          <button
            className="mc-button mc-button-normal w-full py-5 mt-2"
            onClick={next}
          >
            <span className="font-minecraft text-white text-[14px] tracking-wide">
              つぎへ →
            </span>
          </button>
        )}
      </div>

      {/* ◯/× オーバーレイ */}
      {phase === 'animating' && (
        <ResultOverlay isCorrect={isCorrect} onComplete={onAnimationComplete} />
      )}
    </div>
  );
}
