export default function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl animate-pulse" />

      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl animate-pulse" />

      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-3xl animate-pulse" />

    </div>
  );
}