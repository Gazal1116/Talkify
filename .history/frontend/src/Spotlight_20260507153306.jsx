import { motion } from "framer-motion";

export const Spotlight = ({ className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-500 opacity-20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-500 opacity-20 blur-[120px]" />

      <div className="absolute top-1/3 left-0 h-[300px] w-[300px] rounded-full bg-pink-500 opacity-10 blur-[100px]" />
    </motion.div>
  );
};