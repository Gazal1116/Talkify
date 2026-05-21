function AnimatedBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Blob 1 */}
      <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-3xl animate-blob" />

      {/* Blob 2 */}
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-2000" />

      {/* Blob 3 */}
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

    </div>
  );
}

export default AnimatedBg;