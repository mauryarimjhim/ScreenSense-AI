import { useState } from "react";
import { Link } from "react-router-dom";

import {Menu , BarChart3} from "lucide-react";
import SideMenu from "../SideMenu/SideMenu";

function Navbar() {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    return(
     <>
    <nav className= "w-full border-b border-slate-800 bg-[#060B17]/90  backdrop-blur-md ">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
                <div className="rounded-full bg-gradient-to-r from-violet-600 to-purple-500 p-2">
                    <BarChart3 className="h-6 w-6 text-white"/>
                </div>
                <div >
                    <h1 className="text-2xl font-bold text-white">Screen<span className="text-violet-500">Sense-AI</span>
                    </h1>
                </div>
            </Link>
            {/*Right sside*/}
            <div className="flex items-center gap-4">
                <Link to="/login" className="rounded-xl border border-slate-700 px-6 py-2.5 text-white transition hover:border-violet-500 hover:bg-slate-900">
                    Login
                </Link>
                <Link to="/register" className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-2.5 font-medium text-white transition hover:scale-105">
                    Sign Up
                </Link>
            
          <button
              onClick={() => setIsSideMenuOpen(true)}
            className="
            rounded-xl
            border
            border-slate-700
            p-3
            transition
            hover:border-violet-500
            "
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
