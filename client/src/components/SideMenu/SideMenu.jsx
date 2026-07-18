import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

import { menuItems } from "./menuData";
import MenuItem from "./MenuItem";

function SideMenu({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Sidebar */}

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            className="fixed left-0 top-0 z-50 flex h-screen w-80 flex-col bg-[#0B1120] border-r border-slate-800"
          >
            {/* Header */}

            <div className="flex items-center justify-between p-6">

              <h2 className="text-2xl font-bold text-white">

                Menu

              </h2>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 hover:bg-slate-800"
              >
                <X className="text-white" />
              </button>

            </div>

            {/* Menu */}

            <div className="flex-1 space-y-2 px-4">

              {menuItems.map((item) => (
                <MenuItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  path={item.path}
                  onNavigate={() => setOpen(false)}
                />
              ))}

            </div>

            {/* Footer */}

            <div className="border-t border-slate-800 p-6">

              <Link to="/login" className="mb-3 block w-full rounded-xl border border-slate-700 py-3 text-center text-white">
                Login
              </Link>

              <Link to="/register" className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-center font-semibold text-white block">
                Get Started
              </Link>

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default SideMenu;
