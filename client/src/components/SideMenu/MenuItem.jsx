function MenuItem({ icon: Icon, title }) {
  return (
    <button
      className="
      flex
      w-full
      items-center
      gap-4
      rounded-xl
      px-4
      py-4
      text-slate-300
      transition
      hover:bg-violet-600/20
      hover:text-white
      "
    >
      <Icon size={22} />
      <span className="text-lg">{title}</span>
    </button>
  );
}

export default MenuItem;