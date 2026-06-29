function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-slate-800
        bg-white/5
        backdrop-blur-xl
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-violet-500
        hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;