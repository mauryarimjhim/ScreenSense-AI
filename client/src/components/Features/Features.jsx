import { features } from "./featuresData";
import FeaturesCard from "./FeaturesCard";

function Features() {
  return (
    <section className="bg-[#060B17] py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <p className="font-medium uppercase tracking-[4px] text-violet-400">
            Features
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            Why Choose ScreenSense AI?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            Powerful tools designed to help you understand your
            digital habits, improve productivity, and maintain
            a healthier relationship with technology.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

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