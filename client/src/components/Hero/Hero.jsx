import { motion } from "framer-motion";
import heroImage from "../../assets/hero.png";
import HeroContent from "./HeroContent";
import BackgroundGlow from "./BackgroundGlow";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#060B17]">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl flex-col-reverse items-center justify-between gap-16 px-6 py-16 lg:flex-row">

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