import AuthLayout from "../../components/Auth/AuthLayout"
import LeftPanel from "../../components/Auth/LeftPanel"

function ForgotPassword() {
  return (
    <AuthLayout leftPanel={<LeftPanel />}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-white">Forgot Password</h1>
          <p className="mt-3 text-sm text-slate-300">
            Enter your email and instructions will be sent to reset your password.
          </p>
        </div>
        <form className="space-y-4 rounded-3xl bg-slate-950/40 p-6 shadow-xl">
          <label className="block text-sm text-slate-400">
            Email
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-sky-500"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
          >
            Send reset link
          </button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword
