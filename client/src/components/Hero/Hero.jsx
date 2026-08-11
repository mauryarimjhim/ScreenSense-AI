import { motion } from "framer-motion";
import heroImage from "../../assets/hero.png";
import HeroContent from "./HeroContent";
import BackgroundGlow from "./BackgroundGlow";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#060B17] pb-16 pt-8 sm:pb-24 sm:pt-12 lg:pb-32">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col-reverse items-center justify-between gap-12 px-6 py-12 sm:gap-16 sm:px-8 lg:flex-row lg:gap-20 lg:py-20">

        <HeroContent />

        <div className="relative flex justify-center">
          <BackgroundGlow />

          <motion.img
            src={heroImage}
            alt="Dashboard Preview"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: [0,1,0,-1,0]}}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative w-full max-w-md mix-blend-screen"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;