export function TitleLogo() {
  return (
    <div className="relative inline-flex flex-col items-center w-full max-w-lg px-2">
      {/* JAVA EDITION対応 リボン：右上に斜めにかぶさる */}
      <div className="absolute top-0 right-0 w-36 h-36 overflow-hidden pointer-events-none z-10">
        <div
          className="absolute top-9 -right-9 w-48 text-center rotate-[38deg] py-1.5"
          style={{
            background: '#5a8a3c',
            boxShadow: 'inset 0 -3px 0 #2a4a1c, inset 0 3px 0 #8acd5c',
          }}
        >
          <span className="font-minecraft text-white block"
            style={{ fontSize: '7px', letterSpacing: '1px', textShadow: '1px 1px 0 #1a2a10' }}>
            JAVA EDITION対応
          </span>
        </div>
      </div>

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
    </div>
  );
}
