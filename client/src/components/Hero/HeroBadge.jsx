import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2"
    >
      <Sparkles size={18} className="text-violet-400" />

      <span className="text-sm text-violet-300">
        AI Powered Digital Wellness Platform
      </span>
    </motion.div>
  );
}

export default HeroBadge;