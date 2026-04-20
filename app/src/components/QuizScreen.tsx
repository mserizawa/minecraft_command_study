import { useQuiz } from '../hooks/useQuiz';
import { useTyping } from '../hooks/useTyping';
import { ResultOverlay } from './ResultOverlay';
import type { Difficulty } from '../types';

type Props = {
  difficulty: Difficulty;
  onBack: () => void;
};

export function QuizScreen({ onBack }: Props) {
  const { round, phase, selectedId, isCorrect, answer, onAnimationComplete, next } = useQuiz();
  const { question, choices } = round;

  const { displayed: typedDesc, done: typingDone } = useTyping(question.description, question.id);

  // タイピング中はボタン非表示。答え合わせ後は常に表示
  const showButtons = typingDone || phase !== 'answering';

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
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-5 px-4 py-4 w-full max-w-xl mx-auto flex-1">

        {/* お題パネル */}
        <div className="mc-panel w-full p-5">
          <p
            className="font-minecraft text-[#f0f0f0] text-center leading-loose"
            style={{ fontSize: 'clamp(13px, 3.5vw, 18px)' }}
          >
            {phase === 'answering' ? typedDesc : question.description}
            {/* タイピング中のキャレット */}
            {phase === 'answering' && !typingDone && (
              <span className="typing-caret" aria-hidden="true" />
            )}
          </p>
        </div>

        {/* 選択肢ボタン */}
        <div className="flex flex-col gap-3 w-full">
          {choices.map((choice, index) => {
            const isSelected = choice.id === selectedId;
            const showResult = phase === 'revealed' || phase === 'animating';

            let btnClass = 'mc-button';
            if (showResult) {
              if (choice.isCorrect)  btnClass = 'mc-button mc-button-choice-correct';
              else if (isSelected)   btnClass = 'mc-button mc-button-choice-wrong-selected';
              else                   btnClass = 'mc-button mc-button-choice-wrong';
            }

            return (
              <button
                key={choice.id}
                className={`${btnClass} w-full px-4 flex items-center justify-center`}
                style={{
                  height: '96px',
                  opacity: showButtons ? undefined : 0,
                  pointerEvents: showButtons ? undefined : 'none',
                  // タイピング完了直後にポップアップ
                  animation: showButtons && phase === 'answering'
                    ? `button-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 130}ms both`
                    : undefined,
                }}
                onClick={() => answer(choice.id)}
                disabled={phase !== 'answering'}
              >
                <div className="flex flex-col items-center gap-2">
                  <span
                    className="font-minecraft text-[#f0f0f0] tracking-wide"
                    style={{ fontSize: 'clamp(14px, 3.5vw, 20px)' }}
                  >
                    {choice.command}
                  </span>
                  {phase === 'revealed' && !choice.isCorrect && (
                    <span className="font-minecraft text-[15px] leading-loose text-[#cccccc]">
                      {choice.description}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* つぎへ／おしまいボタン */}
        <div style={{ visibility: phase === 'revealed' ? 'visible' : 'hidden' }} className="w-full flex gap-3">
          <button className="mc-button flex-1 py-5" onClick={onBack}>
            <span className="font-minecraft text-[#eeeeee] text-[13px] tracking-wide">
              おしまい
            </span>
          </button>
          <button className="mc-button mc-button-normal flex-1 py-5" onClick={next}>
            <span className="font-minecraft text-[#f0f0f0] text-[14px] tracking-wide">
              つぎへ
            </span>
          </button>
        </div>
      </div>

      {/* O/× オーバーレイ */}
      {phase === 'animating' && (
        <ResultOverlay isCorrect={isCorrect} onComplete={onAnimationComplete} />
      )}
    </div>
  );
}
