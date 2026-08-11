function AuthLayout({ leftPanel, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060B17] px-4 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-800 bg-[#0B1120] shadow-2xl">
        <div className="grid lg:grid-cols-2">
          <div className="hidden lg:block">{leftPanel}</div>

          <div className="flex items-center justify-center bg-[#101827] px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;