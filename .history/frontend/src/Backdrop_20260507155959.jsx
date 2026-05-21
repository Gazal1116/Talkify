export default function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#07070c]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(168,85,247,0.34),transparent_24%),radial-gradient(circle_at_82%_28%,rgba(34,211,238,0.26),transparent_22%),radial-gradient(circle_at_50%_84%,rgba(244,114,182,0.16),transparent_24%),linear-gradient(135deg,rgba(59,130,246,0.12),transparent_38%,rgba(168,85,247,0.10) 62%,transparent_78%)]" />

      <div className="absolute -top-44 -left-44 h-[34rem] w-[34rem] rounded-full bg-violet-600/22 blur-[140px] animate-pulse" />

      <div className="absolute top-24 right-[-7rem] h-[30rem] w-[30rem] rounded-full bg-cyan-400/18 blur-[140px] animate-pulse" />

      <div className="absolute bottom-[-9rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-fuchsia-500/18 blur-[150px]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.04)_50%,transparent_100%)] opacity-20" />
    </div>
  );
}