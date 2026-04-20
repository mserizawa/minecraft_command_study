export function TitleLogo() {
  return (
    <div className="inline-flex flex-col items-center w-full max-w-lg px-2 gap-1">
      {/* MINECRAFT */}
      <div
        className="logo-minecraft text-center w-full"
        style={{ fontSize: 'clamp(28px, 9vw, 68px)' }}
      >
        MINECRAFT
      </div>

      {/* コマンドクイズ */}
      <div
        className="logo-quiz text-center w-full -mt-1"
        style={{ fontSize: 'clamp(18px, 5.5vw, 40px)' }}
      >
        コマンドクイズ
      </div>

      {/* Java Edition バッジ */}
      <p className="font-minecraft text-[#888] text-[9px] tracking-widest mt-1">
        JAVA EDITION 対応
      </p>
    </div>
  );
}
