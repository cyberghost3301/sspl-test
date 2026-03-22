import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Lock, UserPlus, LogIn } from "lucide-react";

export default function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup fields
  const [signupEmail, setSignupEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim().toLowerCase().endsWith("@spirecrest.in") && email.trim().toLowerCase() !== "spirecrestindia@gmail.com") {
      toast.error("Unauthorized Domain. Enterprise credentials required.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Authentication successful");
      navigate("/vanguard/overview");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Full Name is required.");
      return;
    }

    if (!signupEmail.trim().toLowerCase().endsWith("@spirecrest.in") && signupEmail.trim().toLowerCase() !== "spirecrestindia@gmail.com") {
      toast.error("Unauthorized Domain. Enterprise credentials required.");
      return;
    }

    if (signupPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (signupPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: signupEmail.trim(),
      password: signupPassword,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Access request submitted. Awaiting clearance approval.");
      navigate("/vanguard/overview");
    }
  };

  const inputClass =
    "w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono text-sm";

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-[#020617] text-white min-h-screen">
      {/* Geometric grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent animate-pulse"
        style={{ animationDuration: "8s" }}
      />

      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center w-full z-10 px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl relative">

          {/* Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              {mode === "login" ? (
                <Lock className="w-6 h-6 text-cyan-400" />
              ) : (
                <UserPlus className="w-6 h-6 text-cyan-400" />
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-widest text-white uppercase text-center">
              Vanguard
            </h1>
            <p className="text-sm text-slate-400 mt-2 font-mono uppercase tracking-widest text-center">
              {mode === "login" ? "System Authentication" : "Request Access"}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex rounded-lg border border-white/10 mb-6 overflow-hidden">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                mode === "login"
                  ? "bg-cyan-600/30 text-cyan-400 border-r border-white/10"
                  : "text-slate-500 hover:text-white hover:bg-white/5 border-r border-white/10"
              }`}
            >
              <LogIn className="w-3.5 h-3.5" /> Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                mode === "signup"
                  ? "bg-cyan-600/30 text-cyan-400"
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" /> Request Access
            </button>
          </div>

          {/* LOGIN FORM */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-widest text-slate-400 uppercase ml-1">
                  Enterprise Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="operator@spirecrest.in"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-widest text-slate-400 uppercase ml-1">
                  Master Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg uppercase tracking-widest text-sm transition-all flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Authenticate Session"
                )}
              </button>
            </form>
          )}

          {/* SIGNUP FORM */}
          {mode === "signup" && (
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-widest text-slate-400 uppercase ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={inputClass}
                  placeholder="Jane Smith"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-widest text-slate-400 uppercase ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className={inputClass}
                  placeholder="operative@domain.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-widest text-slate-400 uppercase ml-1">
                  Password
                </label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className={inputClass}
                  placeholder="Min 6 characters"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-widest text-slate-400 uppercase ml-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`${inputClass} ${
                    confirmPassword && confirmPassword !== signupPassword
                      ? "border-red-500/50 focus:border-red-500/70 focus:ring-red-500/30"
                      : confirmPassword && confirmPassword === signupPassword
                      ? "border-emerald-500/50"
                      : ""
                  }`}
                  placeholder="Re-enter password"
                  required
                />
                {confirmPassword && confirmPassword !== signupPassword && (
                  <p className="text-[11px] text-red-400 font-mono ml-1">Passwords do not match.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg uppercase tracking-widest text-sm transition-all flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Submit Access Request"
                )}
              </button>

              <p className="text-center text-[11px] text-slate-500 font-mono">
                Your account will enter a pending clearance state until a Super Admin approves it.
              </p>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col items-center">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 tracking-wider">
              <Lock className="w-3 h-3 text-cyan-700" />
              <span>Spirecrest Vanguard. 256-bit Encrypted Connection.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
