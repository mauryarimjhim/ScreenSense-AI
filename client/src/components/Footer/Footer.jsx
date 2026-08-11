function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-[#060B17]/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-sm text-slate-400 sm:flex-row sm:px-8">
        <p>© 2026 ScreenSense AI. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="transition hover:text-white">Privacy</a>
          <a href="#" className="transition hover:text-white">Terms</a>
          <a href="#" className="transition hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;