import { motion } from "framer-motion";

function PremiumBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Main Blur */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl"
      />

      {/* Blue Glow */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl"
      />

      {/* Pink Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute top-[40%] left-[40%] w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-3xl"
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:45px_45px]" />

    </div>
  );
}

export default PremiumBg;