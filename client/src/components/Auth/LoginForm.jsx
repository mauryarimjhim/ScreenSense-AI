import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../services/api";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authApi.login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Welcome Back!
        </h1>
        <p className="text-slate-400">
          Log in to continue your journey.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Email Address
        </label>
        <div className="flex items-center rounded-xl border border-slate-700 bg-[#0B1120] px-4">
          <Mail className="shrink-0 text-slate-400" size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
            className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white">
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-violet-400 hover:text-violet-300"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="flex items-center rounded-xl border border-slate-700 bg-[#0B1120] px-4">
          <Lock className="shrink-0 text-slate-400" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full bg-transparent px-4 py-4 text-white outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="shrink-0 text-slate-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm text-slate-300">
        <input type="checkbox" className="accent-violet-600" />
        Remember Me
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-4 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-700" />
        <span className="text-xs text-slate-500 sm:text-sm">
          OR CONTINUE WITH
        </span>
        <div className="h-px flex-1 bg-slate-700" />
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 py-4 text-white transition hover:border-violet-500"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="h-6"
        />
        Continue with Google
      </button>

      <p className="text-center text-sm text-slate-400">
        Don&apos;t have an account?
        <Link to="/register" className="ml-2 font-medium text-violet-400 hover:text-violet-300">
          Sign Up
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
