import { motion } from "framer-motion";
import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

function HeroContent() {
  return (
    <div className="max-w-xl">

      <HeroBadge />

      <motion.h1
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 text-6xl font-extrabold leading-tight text-white"
      >
        Understand Your

        <span className="block bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
          Digital Life.
        </span>

      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 text-lg leading-9 text-slate-300"
      >
        Track your phone usage in real time, uncover behavioural
        patterns, receive AI-powered insights and build healthier
        digital habits.
      </motion.p>

      <HeroButtons />

      <HeroStats />

    </div>
  );
}

export default HeroContent;