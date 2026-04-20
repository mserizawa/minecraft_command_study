import { TitleLogo } from './TitleLogo';
import { PixelSprite, CREEPER_FACE, GRASS_BLOCK, DIAMOND } from './PixelSprite';

type Difficulty = 'easy' | 'normal' | 'hard';

type Props = {
  onSelect: (difficulty: Difficulty) => void;
};

const difficulties: { id: Difficulty; label: string; className: string }[] = [
  { id: 'easy',   label: 'かんたん',   className: 'mc-button-easy' },
  { id: 'normal', label: 'ふつう',     className: 'mc-button-normal' },
  { id: 'hard',   label: 'むずかしい', className: 'mc-button-hard' },
];

export function TopScreen({ onSelect }: Props) {
  return (
    <div className="relative min-h-svh flex flex-col items-center justify-between overflow-hidden bg-[#1a1a1a]">
      {/* 背景：Minecraftメニュー風ダークパターン */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg,   rgba(0,0,0,0.15) 0, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 16px),
            repeating-linear-gradient(90deg,  rgba(0,0,0,0.15) 0, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 16px)
          `,
          backgroundColor: '#1a1a1a',
        }}
      />

      {/* 上部：草ブロックライン */}
      <div className="w-full z-10">
        <div className="h-4 bg-[#5a8a3c] shadow-[0_3px_0_#3a6a22,0_6px_0_#2a4a1c]" />
        <div className="h-3 bg-[#8b6340]" />
        <div className="h-2 bg-[#6b4a30]" />
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 py-6 w-full max-w-xl">

        {/* タイトルロゴ */}
        <TitleLogo />

        {/* ピクセルアート装飾：ふわふわ浮遊（位相をずらして自然に） */}
        <div className="flex items-end justify-center gap-6 mt-2">
          <div style={{ animation: 'sprite-float 3.2s ease-in-out 0.0s infinite' }}>
            <PixelSprite {...GRASS_BLOCK} scale={8} />
          </div>
          <div style={{ animation: 'sprite-float 2.6s ease-in-out 0.7s infinite' }}>
            <PixelSprite {...CREEPER_FACE} scale={12} />
          </div>
          <div style={{ animation: 'sprite-float 3.5s ease-in-out 1.3s infinite' }}>
            <PixelSprite {...DIAMOND} scale={9} />
          </div>
          <div style={{ animation: 'sprite-float 2.9s ease-in-out 0.4s infinite' }}>
            <PixelSprite {...GRASS_BLOCK} scale={8} />
          </div>
        </div>

        {/* 難易度選択パネル */}
        <div className="mc-panel w-full p-5 flex flex-col gap-4">
          <p className="font-minecraft text-[#FFFF55] text-[10px] text-center tracking-wide">
            ── むずかしさをえらんでね ──
          </p>

          <div className="grid grid-cols-3 gap-3">
            {difficulties.map(({ id, label, className }) => (
              <button
                key={id}
                className={`mc-button ${className} w-full py-6 flex items-center justify-center`}
                onClick={() => onSelect(id)}
              >
                <span className="font-minecraft text-white text-[15px] leading-snug tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 下部：土ブロックライン */}
      <div className="w-full z-10">
        <div className="h-2 bg-[#6b4a30]" />
        <div className="h-3 bg-[#8b6340]" />
        <div className="h-4 bg-[#5a8a3c] shadow-[0_-3px_0_#3a6a22,0_-6px_0_#2a4a1c]" />
      </div>
    </div>
  );
}
