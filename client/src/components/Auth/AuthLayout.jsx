function AuthLayout({ leftPanel, children }) {
  return (
    <div className="min-h-screen bg-[#060B17] flex items-center justify-center p-6">

      <div className="w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-800 bg-[#0B1120] shadow-2xl">

        <div className="grid lg:grid-cols-2">

          {/* Left Side */}
          <div className="hidden lg:block">
            {leftPanel}
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center bg-[#101827] p-10">
            <div className="w-full max-w-md">
              {children}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;