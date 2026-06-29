import GradientText from "../GradientText/GradientText";

function SectionTitle({ badge, title, highlight, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">

      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
        {badge}
      </p>

      <h2 className="text-4xl font-bold text-white md:text-5xl">
        {title} <GradientText>{highlight}</GradientText>
      </h2>

      <p className="mt-6 text-lg leading-8 text-slate-400">
        {description}
      </p>

    </div>
  );
}

export default SectionTitle;