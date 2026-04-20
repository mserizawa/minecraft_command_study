import { useEffect, useMemo } from 'react';

type Props = {
  isCorrect: boolean;
  onComplete: () => void;
};

const DURATION = 1600;

export function ResultOverlay({ isCorrect, onComplete }: Props) {
  useEffect(() => {
    const t = setTimeout(onComplete, DURATION);
    return () => clearTimeout(t);
  }, [onComplete]);

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * 2 * Math.PI;
        const dist = 140 + Math.random() * 100;
        const colors = isCorrect
          ? ['#FFFF55', '#55FF55', '#55FFFF', '#FFFFFF']
          : ['#FF5555', '#FF8800', '#AA3333', '#FF3333'];
        return {
          tx: Math.round(Math.cos(angle) * dist),
          ty: Math.round(Math.sin(angle) * dist),
          color: colors[i % colors.length],
          size: 10 + Math.floor(Math.random() * 12),
          delay: Math.random() * 0.15,
        };
      }),
    [isCorrect],
  );

  const bgColor = isCorrect ? 'rgba(20, 80, 20, 0.75)' : 'rgba(80, 10, 10, 0.75)';
  const symbol = isCorrect ? 'O' : '×';
  const symbolColor = isCorrect ? '#55FF55' : '#FF5555';
  const symbolAnim = isCorrect ? 'result-symbol-correct' : 'result-symbol-wrong';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{ animation: `overlay-flash ${DURATION}ms ease-out forwards`, background: bgColor }}
    >
      {/* パーティクル */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            top: '50%',
            left: '50%',
            marginTop: -p.size / 2,
            marginLeft: -p.size / 2,
            imageRendering: 'pixelated',
            // @ts-expect-error css vars
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            animation: `particle-fly ${DURATION * 0.8}ms ease-out ${p.delay}s forwards`,
          }}
        />
      ))}

      {/* ◯/× シンボル */}
      <span
        className="font-minecraft select-none"
        style={{
          fontSize: 'clamp(100px, 30vw, 200px)',
          color: symbolColor,
          textShadow: `0 0 40px ${symbolColor}, 0 0 80px ${symbolColor}`,
          animation: `${symbolAnim} ${DURATION}ms ease-out forwards`,
          display: 'block',
          lineHeight: 1,
        }}
      >
        {symbol}
      </span>
    </div>
  );
}
