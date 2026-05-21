export default function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#0b0b10]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.26),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.2),transparent_32%),radial-gradient(circle_at_center,rgba(236,72,153,0.12),transparent_28%)]" />

      <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-[120px] animate-pulse" />

      <div className="absolute top-1/3 -right-36 h-[24rem] w-[24rem] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />

      <div className="absolute -bottom-44 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-[140px]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] opacity-30" />
    </div>
  );
}