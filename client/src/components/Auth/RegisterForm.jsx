import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../services/api";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await authApi.register({ name, email, password });
      navigate("/login");
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
          Create Account
        </h1>
        <p className="text-slate-400">
          Join ScreenSense AI and start tracking your digital habits.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Full Name
        </label>
        <div className="flex items-center rounded-xl border border-slate-700 bg-[#0B1120] px-4">
          <User className="shrink-0 text-slate-400" size={20} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Rimjhim Maurya"
            required
            className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

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
        <label className="block text-sm font-medium text-white">
          Password
        </label>
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

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Confirm Password
        </label>
        <div className="flex items-center rounded-xl border border-slate-700 bg-[#0B1120] px-4">
          <Lock className="shrink-0 text-slate-400" size={20} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full bg-transparent px-4 py-4 text-white outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="shrink-0 text-slate-400 hover:text-white"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm text-slate-300">
        <input type="checkbox" required className="h-4 w-4 accent-violet-600" />
        I agree to the
        <span className="cursor-pointer text-violet-400 hover:text-violet-300">
          Terms &amp; Conditions
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create Account"}
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
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 px-6 py-4 text-white transition hover:border-violet-500 hover:bg-white/5"
      >
        <img src="/google.svg" alt="Google" className="h-5" />
        Continue with Google
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?
        <Link to="/login" className="ml-2 font-medium text-violet-400 hover:text-violet-300">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
