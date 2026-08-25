export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-full overflow-hidden select-none">
      {/* Edit these blobs to change the shared glow: size, position, color, opacity, and blur. */}
      <div style={{ left: "-62rem", top: "-43rem" }} className="absolute size-[64rem] rounded-full bg-[#7AD39E]/30 blur-[120px]" />
      <div style={{ left: "50%", top: "-70rem", transform: "translateX(-50%)" }} className="absolute size-[64rem] rounded-full bg-[#3D9B69]/55 blur-[120px]" />
      <div style={{ right: "-47rem", top: "-58rem" }} className="absolute size-[64rem] rounded-full bg-[#A6E6BA]/20 blur-[100px]" />
    </div>
  );
}
