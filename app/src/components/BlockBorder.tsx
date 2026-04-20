type Props = { position: 'top' | 'bottom' };

export function BlockBorder({ position }: Props) {
  if (position === 'top') {
    return (
      <div className="w-full z-10 flex-shrink-0">
        <div className="h-4 bg-[#5a8a3c] shadow-[0_3px_0_#3a6a22,0_6px_0_#2a4a1c]" />
        <div className="h-3 bg-[#8b6340]" />
        <div className="h-2 bg-[#6b4a30]" />
      </div>
    );
  }
  return (
    <div className="w-full z-10 flex-shrink-0">
      <div className="h-2 bg-[#6b4a30]" />
      <div className="h-3 bg-[#8b6340]" />
      <div className="h-4 bg-[#5a8a3c] shadow-[0_-3px_0_#3a6a22,0_-6px_0_#2a4a1c]" />
    </div>
  );
}
