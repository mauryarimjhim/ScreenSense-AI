import { features } from "./featuresData";
import FeaturesCard from "./FeaturesCard";

function Features() {
  return (
    <section id="features" className="border-t border-slate-800/60 bg-[#060B17] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
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

        <div className="mt-16 grid gap-6 sm:mt-20 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">

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
