import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useState } from 'react';


function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell bg-[#060B17] text-white">
      <div className="app-shell__inner">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`app-shell__sidebar
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className="app-shell__main">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="dashboard-main-scroll">
            <section className="dashboard-content">
              <Outlet />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
