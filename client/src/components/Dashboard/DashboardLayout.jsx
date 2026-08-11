import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useState } from 'react';


function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060B17] text-white">
      <div className="flex">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
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
