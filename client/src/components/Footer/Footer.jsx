import { Mail, Wrench } from "lucide-react";
import { DEVELOPER_NAME, SUPPORT_EMAIL } from "../../config/project";

function Footer() {
  return (
    <footer className="bg-[#080e1b] ">
      <div className="site-container px-5 pt-25 pb-14 sm:px-8 sm:pt-24 sm:pb-16 lg:px-10 lg:pt-28 lg:pb-20">

        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-20">

          {/* Support Section */}
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Support & Contact
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
              If you experience any issues with ScreenSense-AI, feel free to
              contact the project support team. We’re here to help with any
              questions or technical issues.
            </p>
          </div>

          {/* Contact Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7 shadow-lg shadow-black/10 sm:p-8">

            {/* Support Email */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                <Mail
                  size={18}
                  className="text-violet-400"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Support Email
                </p>

                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="mt-1.5 block break-all text-sm font-medium text-violet-300 transition hover:text-violet-200 sm:text-base"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-slate-800" />

            {/* Developer */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                <Wrench
                  size={18}
                  className="text-violet-400"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Developed By
                </p>

                <p className="mt-1.5 text-sm font-medium text-slate-200 sm:text-base">
                  {DEVELOPER_NAME}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 pt-8 sm:mt-20 sm:pt-9">
          <div className="flex flex-col gap-2 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <p>
              © 2026 ScreenSense-AI. All rights reserved.
            </p>

            <p className="text-slate-600">
              Digital Wellbeing • AI Powered
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
