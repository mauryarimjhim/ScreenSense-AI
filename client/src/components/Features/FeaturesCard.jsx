function FeaturesCard({ icon: Icon, title, description }) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/60
        flex flex-col gap-4 p-6 sm:p-7
        transition-all
        duration-300
        hover:-translate-y-3
        hover:border-violet-500
        hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]
      "
    >
      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-violet-600/20
          transition
          group-hover:bg-violet-600
        "
      >
        <Icon
          size={30}
          className="text-violet-400 group-hover:text-white"
        />
      </div>

      <h3 className="text-2xl font-semibold text-white">
        {title}
      </h3>

      <p className="leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default FeaturesCard;
