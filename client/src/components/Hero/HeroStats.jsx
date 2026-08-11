function HeroStats() {
  return (
    <div className="flex flex-wrap gap-8 sm:gap-10 text-left text-sm text-slate-300">
      <div>
        <h3 className="text-3xl font-bold text-violet-400">10K+</h3>
        <p>Users</p>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-violet-400">98%</h3>
        <p>Prediction Accuracy</p>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-violet-400">40+</h3>
        <p>Tracked Apps</p>
      </div>
    </div>
  );
}

export default HeroStats;
