import { features } from "./featuresData";
import FeaturesCard from "./FeaturesCard";

function Features() {
  return (
    
      <section
             id="features"
             className="bg-[#060B17] pb-32 pt-20 sm:pb-36 sm:pt-28 lg:pb-44 lg:pt-32"
                >
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-violet-400">
            Features
          </p>
          <h2 className="mt-5 text-4xl font-bold text-white sm:text-5xl">
            Why Choose ScreenSense AI?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-400 sm:text-lg">
            Powerful tools designed to help you understand your
            digital habits, improve productivity, and maintain
            a healthier relationship with technology.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:mt-20 sm:gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">

          {features.map((feature) => (
            <FeaturesCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;
