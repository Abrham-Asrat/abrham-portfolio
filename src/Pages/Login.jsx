import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail } from "../firebase-auth";
import { onAuthStateChanged } from "firebase/auth";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Send } from "lucide-react";

// ── admin contact email — change this to your real email ──
const ADMIN_EMAIL = "abrhamasrat08@gmail.com";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // forgot-password state
  const [view, setView] = useState("login"); // "login" | "forgot"
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/admin");
    });
    return unsub;
  }, [navigate]);

  /* ── login ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":    setError("No account found with this email."); break;
        case "auth/wrong-password":    setError("Incorrect password."); break;
        case "auth/invalid-email":     setError("Invalid email address."); break;
        case "auth/too-many-requests": setError("Too many attempts. Try again later."); break;
        default:                       setError("Login failed. Check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ── password reset ── */
  const handleReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetLoading(true);
    setResetMsg({ type: "", text: "" });
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMsg({ type: "success", text: `Reset link sent to ${resetEmail}. Check your inbox.` });
      setResetEmail("");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setResetMsg({ type: "error", text: "No account found with that email." });
      } else if (err.code === "auth/invalid-email") {
        setResetMsg({ type: "error", text: "Invalid email address." });
      } else {
        setResetMsg({ type: "error", text: "Failed to send reset email. Try again." });
      }
    } finally {
      setResetLoading(false);
    }
  };

  /* ── contact admin ── */
  const handleContact = () => {
    window.location.href = `mailto:${ADMIN_EMAIL}?subject=Admin%20Access%20Request&body=Hi%2C%20I%20would%20like%20to%20request%20access%20to%20the%20admin%20panel.`;
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* ambient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">

        {/* ══ LOGIN VIEW ══ */}
        {view === "login" && (
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/40">
            {/* header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 mb-4">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Admin Login
              </h1>
              <p className="text-white/40 text-sm mt-1">Sign in to access the dashboard</p>
            </div>

            {/* error */}
            {error && (
              <div className="mb-5 flex items-center gap-2.5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
                <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* email */}
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>

              {/* password */}
              <div>
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* forgot */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => { setView("forgot"); setError(""); }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-lg shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {loading && (
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>

            {/* contact */}
            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
              <p className="text-white/30 text-xs mb-2">Don't have an account?</p>
              <button
                onClick={handleContact}
                className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-4 decoration-purple-400/40"
              >
                Contact administrator
              </button>
            </div>
          </div>
        )}

        {/* ══ FORGOT PASSWORD VIEW ══ */}
        {view === "forgot" && (
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/40">
            {/* back */}
            <button
              onClick={() => { setView("login"); setResetMsg({ type: "", text: "" }); }}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to login
            </button>

            {/* header */}
            <div className="mb-7">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/20 mb-4">
                <Mail className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-xl font-black text-white">Reset Password</h2>
              <p className="text-white/40 text-sm mt-1">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            {/* feedback */}
            {resetMsg.text && (
              <div className={`mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm border ${
                resetMsg.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-red-500/10 border-red-500/30 text-red-300"
              }`}>
                <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${resetMsg.type === "success" ? "bg-emerald-400" : "bg-red-400"}`} />
                {resetMsg.text}
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {resetLoading
                  ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Sending…</>
                  : <><Send className="w-4 h-4" /> Send Reset Link</>
                }
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default LoginPage;
