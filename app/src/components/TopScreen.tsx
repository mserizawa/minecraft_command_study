import { TitleLogo } from './TitleLogo';

type Difficulty = 'easy' | 'normal' | 'hard';

type Props = {
  onSelect: (difficulty: Difficulty) => void;
};

const difficulties: { id: Difficulty; label: string; sub: string; className: string }[] = [
  {
    id: 'easy',
    label: 'かんたん',
    sub: 'コマンドをえらぼう',
    className: 'mc-button-easy',
  },
  {
    id: 'normal',
    label: 'ふつう',
    sub: 'スペルに気をつけろ',
    className: 'mc-button-normal',
  },
  {
    id: 'hard',
    label: 'むずかしい',
    sub: 'ひきすうまで完璧に',
    className: 'mc-button-hard',
  },
];

export function TopScreen({ onSelect }: Props) {
  return (
    <div className="relative min-h-svh flex flex-col items-center justify-between overflow-hidden bg-[#1a1a1a]">
      {/* 背景：ブロック風グリッドテクスチャ */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      {/* 上部：草ブロックライン */}
      <div className="w-full h-3 bg-[#5a8a3c] shadow-[0_4px_0_#2a4a1c]" />

      {/* メインコンテンツ */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 py-10 w-full max-w-2xl">

        {/* タイトルロゴ */}
        <div className="flex flex-col items-center gap-3 mt-4 w-full">
          <TitleLogo />

          {/* サブキャッチ */}
          <p className="font-minecraft text-[#aaaaaa] text-[9px] text-center leading-loose tracking-wide mt-2">
            コマンドの知識をためそう！
          </p>
        </div>

        {/* 難易度選択パネル */}
        <div className="mc-panel w-full p-6 flex flex-col gap-3">
          <p className="font-minecraft text-[#FFFF55] text-[10px] text-center mb-3 tracking-wide">
            ── むずかしさをえらんでね ──
          </p>

          {difficulties.map(({ id, label, sub, className }) => (
            <button
              key={id}
              className={`mc-button ${className} w-full py-5 px-4 flex flex-col items-center gap-2`}
              onClick={() => onSelect(id)}
            >
              <span className="font-minecraft text-white text-[14px] tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                {label}
              </span>
              <span className="font-minecraft text-[9px] text-white/70">
                {sub}
              </span>
            </button>
          ))}
        </div>

        {/* 装飾フッター */}
        <p className="font-minecraft text-[#555] text-[8px] text-center leading-loose">
          ※ Java Edition 1.21 対応
        </p>
      </div>

      {/* 下部：土ブロックライン */}
      <div className="w-full">
        <div className="h-3 bg-[#5a8a3c] shadow-[0_-4px_0_#2a4a1c]" />
        <div className="h-4 bg-[#8b6340]" />
        <div className="h-2 bg-[#5a3d20]" />
      </div>
    </div>
  );
}
