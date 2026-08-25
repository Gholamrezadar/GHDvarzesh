export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-full overflow-hidden select-none">
      {/* Edit these blobs to change the shared glow: size, position, color, opacity, and blur. */}
      {/* <div style={{ left: "-38rem", top: "-63rem" }} className="absolute size-[64rem] rounded-full bg-[#3D9B69]/30 blur-[120px]" /> */}
      <div style={{ left: "-50rem", top: "-55rem" }} className="absolute size-[74rem] rounded-full bg-[#3D9B69]/10 blur-[100px]" />
      <div style={{ left: "50%", top: "-70rem", transform: "translateX(-50%)" }} className="absolute size-[70rem] rounded-full bg-[#3D9B69]/25 blur-[120px]" />
      <div style={{ right: "-40rem", top: "-60rem" }} className="absolute size-[74rem] rounded-full bg-[#3D9B69]/10 blur-[100px]" />
    </div>
  );
}
