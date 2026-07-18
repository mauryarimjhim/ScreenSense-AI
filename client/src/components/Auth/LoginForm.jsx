import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div>

      <h1 className="text-5xl font-bold text-white">
        Welcome Back!
      </h1>

      <p className="mt-3 text-slate-400">
        Log in to continue your journey.
      </p>

      {/* Email */}

      <div className="mt-10">

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

        <div className="mb-3 flex justify-between">

          <label className="text-white">
            Password
          </label>

          <Link
            to="/forgot-password"
            className="text-violet-400 hover:text-violet-300"
          >
            Forgot Password?
          </Link>

        </div>

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

      {/* Remember */}

      <div className="mt-6 flex items-center justify-between">

        <label className="flex items-center gap-3 text-slate-300">

          <input
            type="checkbox"
            className="accent-violet-600"
          />

          Remember Me

        </label>

      </div>

      {/* Login */}

      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="mt-8 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-4 font-semibold text-white transition hover:scale-[1.02]"
      >
        Log In
      </button>

      {/* Divider */}

      <div className="my-8 flex items-center">

        <div className="h-px flex-1 bg-slate-700"></div>

        <span className="mx-4 text-slate-500">

          OR CONTINUE WITH

        </span>

        <div className="h-px flex-1 bg-slate-700"></div>

      </div>

      {/* Google */}

      <button
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 py-4 text-white transition hover:border-violet-500"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="h-6"
        />

        Continue with Google

      </button>

      {/* Bottom */}

      <p className="mt-8 text-center text-slate-400">

        Don't have an account?

        <Link
          to="/register"
          className="ml-2 text-violet-400"
        >
          Sign Up
        </Link>

      </p>

    </div>
  );
}

export default LoginForm;
