import { motion } from "framer-motion";
import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

function HeroContent() {
  return (
    <div className="max-w-xl space-y-8">
      <HeroBadge />

      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="text-5xl font-extrabold leading-tight text-white sm:text-6xl"
        >
          Understand Your
          <span className="mt-2 block bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
            Digital Life.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-8"
        >
          Track your phone usage in real time, uncover behavioural
          patterns, receive AI-powered insights and build healthier
          digital habits.
        </motion.p>
      </div>

      <HeroButtons />
      <HeroStats />
    </div>
  );
}

export default HeroContent;