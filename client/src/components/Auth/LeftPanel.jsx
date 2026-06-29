import loginImage from "../../assets/loginImage.png";
import { BarChart3 } from "lucide-react";

function LeftPanel() {
  return (
    <div className="relative flex h-full flex-col justify-between bg-[#070B1B] p-10">

      {/* Logo */}

      <div>

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 p-2">

            <BarChart3 className="h-6 w-6 text-white" />

          </div>

          <h1 className="text-3xl font-bold text-white">

            Screen<span className="text-violet-500">Sense AI</span>

          </h1>

        </div>

        <h2 className="mt-10 text-5xl font-bold leading-tight text-white">

          Understand Your
          <br />
          Digital Life.

        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-400">

          Track. Analyze. Improve.

          <br />

          AI-powered insights that help you build
          healthier digital habits.

        </p>

      </div>

      {/* Illustration */}

      <div className="mt-10 flex justify-center">

        <img
          src={loginImage}
          alt="Illustration"
          className="w-full max-w-lg object-contain"
        />

      </div>

    </div>
  );
}

export default LeftPanel;