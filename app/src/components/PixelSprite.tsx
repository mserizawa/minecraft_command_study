type Props = {
  grid: string[][];
  palette: Record<string, string>;
  scale?: number;
};

export function PixelSprite({ grid, palette, scale = 10 }: Props) {
  const rows = grid.length;
  const cols = Math.max(...grid.map((r) => r.length));

  const shadows = grid
    .flatMap((row, y) =>
      row.map((key, x) =>
        palette[key] ? `${x}px ${y}px 0 ${palette[key]}` : null
      )
    )
    .filter(Boolean)
    .join(', ');

  return (
    <div style={{ width: cols * scale, height: rows * scale, flexShrink: 0 }}>
      <div
        style={{
          width: 1,
          height: 1,
          boxShadow: shadows,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}

// ── スプライト定義 ──────────────────────────────────

export const CREEPER_FACE = {
  grid: [
    ['G','G','G','G','G','G','G','G'],
    ['G','G','G','G','G','G','G','G'],
    ['G','D','D','G','G','D','D','G'],
    ['G','D','D','G','G','D','D','G'],
    ['G','G','G','G','G','G','G','G'],
    ['G','G','D','D','D','D','G','G'],
    ['G','D','G','G','G','G','D','G'],
    ['G','G','G','G','G','G','G','G'],
  ],
  palette: { G: '#4a8a30', D: '#1a2a10' },
};

export const GRASS_BLOCK = {
  grid: [
    ['G','G','G','G','G','G','G','G'],
    ['G','K','G','G','K','G','G','K'],
    ['B','D','B','B','D','B','B','D'],
    ['D','B','B','D','B','D','B','B'],
    ['B','B','D','B','B','D','B','D'],
    ['D','B','D','B','D','B','B','D'],
    ['B','D','B','B','B','D','B','B'],
    ['D','B','B','D','B','D','B','B'],
  ],
  palette: { G: '#5a8a3c', K: '#3a6a22', B: '#8b6340', D: '#6b4a30' },
};

export const DIAMOND = {
  grid: [
    ['.','.','.','C','C','.','.','.'],
    ['.','.','C','C','C','C','.','.'],
    ['.','C','C','C','C','C','C','.'],
    ['C','C','C','C','C','C','C','C'],
    ['.','C','C','C','C','C','C','.'],
    ['.','.','C','C','C','C','.','.'],
    ['.','.','.','C','C','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
  ],
  palette: { C: '#40CFEE', '.': '' },
};

export const SWORD = {
  grid: [
    ['.','.','.','.','.','S','.'],
    ['.','.','.','.','S','.','.'],
    ['.','.','.','S','.','.','H'],
    ['.','.','S','.','.','.','H'],
    ['.','S','.','.','.','.','H'],
    ['S','.','.','.','.','.','H'],
    ['.','.','.','.','.','.','H'],
    ['.','.','.','.','.','S','.'],
  ],
  palette: { S: '#90e0f0', H: '#8b6340', '.': '' },
};
