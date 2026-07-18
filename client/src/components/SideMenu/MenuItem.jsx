import { NavLink } from "react-router-dom";

function MenuItem({ icon: Icon, title, path, onNavigate }) {
  return (
    <NavLink
      to={path}
      onClick={onNavigate}
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
    </NavLink>
  );
}

export default MenuItem;
