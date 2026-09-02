import { motion } from "framer-motion";
import heroImage from "../../assets/hero.png";
import HeroContent from "./HeroContent";
import BackgroundGlow from "./BackgroundGlow";

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#060B17] py-12 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(124,58,237,0.2),transparent_32%),radial-gradient(circle_at_90%_45%,rgba(14,165,233,0.12),transparent_28%)]" />
      <div className="site-container relative grid min-h-[calc(100vh-5rem)] items-center gap-12 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12">

        <HeroContent />

        <div className="relative flex w-full justify-center">
          <BackgroundGlow />

          <motion.img
            src={heroImage}
            alt="Dashboard Preview"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: [0,1,0,-1,0]}}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative w-full max-w-lg rounded-2xl border border-violet-400/15 shadow-[0_28px_90px_rgba(2,6,23,0.65)]"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
