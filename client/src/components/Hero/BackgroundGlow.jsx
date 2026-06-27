import { motion } from "framer-motion";

function BackgroundGlow() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
      }}
      className="absolute right-0 bottom-10 h-96 w-96 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 blur-3xl opacity-30"
    />
  );
}

export default BackgroundGlow;