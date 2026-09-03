import { useState } from "react";
import { Link } from "react-router-dom";

import { Menu, BarChart3 } from "lucide-react";
import SideMenu from "../SideMenu/SideMenu";

function Navbar() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#060B17]/90 backdrop-blur-md">
        <div className="site-container flex h-16 items-center justify-between gap-4 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-r from-violet-600 to-purple-500 p-2">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Screen<span className="text-violet-500">Sense-AI</span>
            </h1>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="hidden sm:inline-flex
                 items-center justify-center
                 rounded-lg
                 border border-slate-700
                 px-4 py-2
                 text-sm font-medium text-slate-200
                 bg-transparent
                 transition-all duration-200
                 hover:border-violet-500/60
                 hover:bg-violet-500/10
                 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105 sm:px-6"
            >
              Sign Up
            </Link>

            <button
              onClick={() => setIsSideMenuOpen(true)}
              className="rounded-xl border border-slate-700 p-2.5 transition hover:border-violet-500 lg:hidden"
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </nav>
      <SideMenu open={isSideMenuOpen} setOpen={setIsSideMenuOpen} />
    </>
  );
}

export default Navbar;
