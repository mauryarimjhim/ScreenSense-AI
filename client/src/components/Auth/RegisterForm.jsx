import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>

      {/* Heading */}

      <h1 className="text-5xl font-bold text-white">
        Create Account
      </h1>

      <p className="mt-3 text-slate-400">
        Join ScreenSense AI and start tracking your digital habits.
      </p>

      {/* Full Name */}

      <div className="mt-10">

        <label className="mb-3 block text-white">
          Full Name
        </label>

        <div className="flex items-center rounded-xl border border-slate-700 bg-[#0B1120] px-4">

          <User className="text-slate-400" size={20} />

          <input
            type="text"
            placeholder="Rimjhim Maurya"
            className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />

        </div>

      </div>

      {/* Email */}

      <div className="mt-6">

        <label className="mb-3 block text-white">
          Email Address
        </label>

        <div className="flex items-center rounded-xl border border-slate-700 bg-[#0B1120] px-4">

          <Mail className="text-slate-400" size={20} />

          <input
            type="email"
            placeholder="john@example.com"
            className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />

        </div>

      </div>

      {/* Password */}

      <div className="mt-6">

        <label className="mb-3 block text-white">
          Password
        </label>

        <div className="flex items-center rounded-xl border border-slate-700 bg-[#0B1120] px-4">

          <Lock className="text-slate-400" size={20} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full bg-transparent px-4 py-4 text-white outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="text-slate-400" />
            ) : (
              <Eye className="text-slate-400" />
            )}
          </button>

        </div>

      </div>

      {/* Confirm Password */}

      <div className="mt-6">

        <label className="mb-3 block text-white">
          Confirm Password
        </label>

        <div className="flex items-center rounded-xl border border-slate-700 bg-[#0B1120] px-4">

          <Lock className="text-slate-400" size={20} />

          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full bg-transparent px-4 py-4 text-white outline-none"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="text-slate-400" />
            ) : (
              <Eye className="text-slate-400" />
            )}
          </button>

        </div>

      </div>

      {/* Terms */}

      <div className="mt-6">

        <label className="flex items-center gap-3 text-slate-300">

          <input
            type="checkbox"
            className="h-4 w-4 accent-violet-600"
          />

          I agree to the
          <span className="cursor-pointer text-violet-400 hover:text-violet-300">
            Terms & Conditions
          </span>

        </label>

      </div>

      {/* Create Account */}

      <button
        className="mt-8 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-4 font-semibold text-white transition hover:scale-[1.02]"
      >
        Create Account
      </button>

      {/* Divider */}

      <div className="my-8 flex items-center">

        <div className="h-px flex-1 bg-slate-700"></div>

        <span className="mx-4 text-sm text-slate-500">
          OR CONTINUE WITH
        </span>

        <div className="h-px flex-1 bg-slate-700"></div>

      </div>

      {/* Google */}

      <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 py-4 text-white transition hover:border-violet-500">

        <img
          src="/google.svg"
          alt="Google"
          className="h-5"
        />

        Continue with Google

      </button>

      {/* Bottom */}

      <p className="mt-8 text-center text-slate-400">

        Already have an account?

        <Link
          to="/login"
          className="ml-2 font-medium text-violet-400 hover:text-violet-300"
        >
          Login
        </Link>

      </p>

    </div>
  );
}

export default RegisterForm;