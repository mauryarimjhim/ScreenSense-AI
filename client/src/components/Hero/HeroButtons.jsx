function HeroButtons() {
  return (
    <div className="mt-10 flex flex-wrap gap-5">
      <button className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105">
        Get Started
      </button>
      <button className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-white transition hover:border-violet-500 hover:bg-slate-900">
        Learn More
      </button>
    </div>
  );
}

export default HeroButtons;
