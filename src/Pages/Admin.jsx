import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signOut, updateEmail, updatePassword, db } from "../firebase-auth";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {
  Eye, EyeOff, LogOut, User, Lock, Mail,
  MessageSquare, Trash2, Settings, Bell, Shield,
  ChevronRight, Inbox,
} from "lucide-react";

/* ─── tiny helpers ─────────────────────────────────── */
const GlassCard = ({ children, className = "", glow = "indigo" }) => {
  const glowMap = {
    indigo: "hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.5)]",
    purple: "hover:shadow-[0_0_40px_-8px_rgba(168,85,247,0.5)]",
    red:    "hover:shadow-[0_0_40px_-8px_rgba(239,68,68,0.4)]",
  };
  return (
    <div
      className={`
        relative bg-white/[0.04] backdrop-blur-xl
        border border-white/10 rounded-2xl
        transition-all duration-300
        ${glowMap[glow]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

const GlassInput = ({ icon: Icon, accentColor = "#6366f1", ...props }) => (
  <div className="relative">
    {Icon && (
      <Icon
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
        style={{ color: accentColor }}
      />
    )}
    <input
      {...props}
      className={`
        w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3
        bg-white/[0.05] border border-white/10 rounded-xl
        text-white placeholder-white/30 text-sm
        focus:outline-none focus:border-white/30 focus:bg-white/[0.08]
        transition-all duration-200
      `}
    />
  </div>
);

const Badge = ({ count, color = "#6366f1" }) => (
  <span
    className="ml-2 px-2 py-0.5 rounded-full text-[11px] font-bold"
    style={{ background: `${color}22`, color }}
  >
    {count}
  </span>
);

const Spinner = ({ color = "#6366f1" }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3">
    <div
      className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
      style={{ borderColor: `${color} transparent transparent transparent` }}
    />
    <p className="text-white/40 text-sm">Loading…</p>
  </div>
);

const EmptyState = ({ icon: Icon, text }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/30">
    <Icon className="w-10 h-10" />
    <p className="text-sm italic">{text}</p>
  </div>
);

/* ─── main component ───────────────────────────────── */
const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [emailDataWithPassword, setEmailDataWithPassword] = useState({ newEmail: "", confirmEmail: "", currentPassword: "" });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState({ type: "", text: "" });
  const [activeTab, setActiveTab] = useState("messages");
  const navigate = useNavigate();

  /* auth */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      u ? setUser(u) : navigate("/login");
      setLoading(false);
    });
    return unsub;
  }, [navigate]);

  /* fetch messages */
  useEffect(() => {
    if (!user) return;
    setLoadingMessages(true);
    getDocs(collection(db, "messages"))
      .then((snap) => {
        const list = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => toDate(b.timestamp) - toDate(a.timestamp));
        setMessages(list);
      })
      .catch(() => showToast("error", "Failed to load messages"))
      .finally(() => setLoadingMessages(false));
  }, [user]);

  /* fetch comments */
  useEffect(() => {
    if (!user) return;
    setLoadingComments(true);
    getDocs(collection(db, "portfolio-comments"))
      .then((snap) => {
        const list = snap.docs
          .map((d) => {
            const data = d.data();
            return { id: d.id, ...data, timestamp: data.timestamp || data.createdAt };
          })
          .sort((a, b) => toDate(b.timestamp) - toDate(a.timestamp));
        setComments(list);
      })
      .catch(() => showToast("error", "Failed to load comments"))
      .finally(() => setLoadingComments(false));
  }, [user]);

  const toDate = (t) => {
    if (!t) return new Date(0);
    return t.toDate ? t.toDate() : new Date(t);
  };

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast({ type: "", text: "" }), 4000);
  };

  const deleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, "messages", id));
      setMessages((p) => p.filter((m) => m.id !== id));
      showToast("success", "Message deleted");
    } catch { showToast("error", "Failed to delete message"); }
  };

  const deleteComment = async (id) => {
    try {
      await deleteDoc(doc(db, "portfolio-comments", id));
      setComments((p) => p.filter((c) => c.id !== id));
      showToast("success", "Comment deleted");
    } catch { showToast("error", "Failed to delete comment"); }
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    const { newEmail, confirmEmail, currentPassword } = emailDataWithPassword;
    if (newEmail !== confirmEmail) return showToast("error", "Emails do not match!");
    if (!newEmail || !currentPassword) return showToast("error", "Please fill all fields.");
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, cred);
      await updateEmail(user, newEmail);
      showToast("success", "Email updated!");
      setEmailDataWithPassword({ newEmail: "", confirmEmail: "", currentPassword: "" });
      setShowEmailForm(false);
    } catch (err) {
      showToast("error", err.code === "auth/wrong-password" ? "Wrong password." : err.message);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (newPassword !== confirmPassword) return showToast("error", "Passwords do not match!");
    if (newPassword.length < 6) return showToast("error", "Min 6 characters.");
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPassword);
      showToast("success", "Password updated!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordForm(false);
    } catch (err) {
      showToast("error", err.code === "auth/wrong-password" ? "Wrong password." : err.message);
    }
  };

  /* tab config */
  const tabs = [
    { id: "messages",  label: "Messages",  icon: Inbox,         count: messages.length,  color: "#6366f1" },
    { id: "comments",  label: "Comments",  icon: MessageSquare, count: comments.length,  color: "#a855f7" },
    { id: "settings",  label: "Settings",  icon: Settings,      count: null,             color: "#06b6d4" },
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-white/40 text-sm tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-x-hidden">

      {/* ── ambient bg orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-600/8 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── top header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-1">Control Panel</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
          </div>

          {/* profile pill */}
          <GlassCard className="flex items-center gap-3 px-4 py-3" glow="indigo">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#030014]" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Admin</p>
              <p className="text-[11px] text-white/40 truncate max-w-[140px]">{user?.email}</p>
            </div>
            <button
              onClick={async () => { await signOut(auth); navigate("/login"); }}
              className="ml-2 p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </GlassCard>
        </div>

        {/* ── stat cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Messages",  value: messages.length,  icon: Inbox,         from: "#6366f1", to: "#818cf8" },
            { label: "Comments",  value: comments.length,  icon: MessageSquare, from: "#a855f7", to: "#c084fc" },
            { label: "Status",    value: "Active",         icon: Shield,        from: "#06b6d4", to: "#67e8f9" },
          ].map((s) => (
            <GlassCard key={s.label} className="p-5" glow="indigo">
              <div className="flex items-start justify-between mb-3">
                <p className="text-white/40 text-xs uppercase tracking-widest">{s.label}</p>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${s.from}33, ${s.to}22)` }}
                >
                  <s.icon className="w-4 h-4" style={{ color: s.from }} />
                </div>
              </div>
              <p
                className="text-2xl font-black tracking-tight"
                style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {s.value}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* ── tab navigation ── */}
        <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/[0.08] rounded-2xl mb-8 w-fit">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`
                relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold
                transition-all duration-300
                ${activeTab === t.id
                  ? "text-white shadow-lg"
                  : "text-white/40 hover:text-white/70"
                }
              `}
              style={activeTab === t.id ? {
                background: `linear-gradient(135deg, ${t.color}33, ${t.color}11)`,
                boxShadow: `0 0 20px -4px ${t.color}66`,
                borderColor: `${t.color}44`,
                border: "1px solid",
              } : {}}
            >
              <t.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.label}</span>
              {t.count !== null && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: `${t.color}33`, color: t.color }}
                >
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── toast ── */}
        {toast.text && (
          <div className={`
            mb-6 px-5 py-3.5 rounded-2xl text-sm font-medium flex items-center gap-3
            border backdrop-blur-xl animate-slide-up
            ${toast.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border-red-500/30 text-red-300"
            }
          `}>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${toast.type === "success" ? "bg-emerald-400" : "bg-red-400"}`} />
            {toast.text}
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: MESSAGES
        ══════════════════════════════════════ */}
        {activeTab === "messages" && (
          <GlassCard glow="indigo">
            <div className="p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Inbox className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Messages</h2>
                  <p className="text-white/40 text-xs">Contact form submissions</p>
                </div>
                <Badge count={messages.length} color="#6366f1" />
              </div>
            </div>

            <div className="p-6">
              {loadingMessages ? (
                <Spinner color="#6366f1" />
              ) : messages.length === 0 ? (
                <EmptyState icon={Inbox} text="No messages yet" />
              ) : (
                <div className="space-y-3 max-h-[560px] overflow-y-auto custom-scrollbar pr-1">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-indigo-500/30 rounded-xl p-4 sm:p-5 transition-all duration-200"
                    >
                      <div className="flex justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                            <span className="font-bold text-sm text-white">{msg.name}</span>
                            <span className="text-indigo-400/80 text-xs truncate">{msg.email}</span>
                            <span className="text-white/25 text-[11px] ml-auto">
                              {toDate(msg.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                        </div>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="flex-shrink-0 w-8 h-8 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>
        )}

        {/* ══════════════════════════════════════
            TAB: COMMENTS
        ══════════════════════════════════════ */}
        {activeTab === "comments" && (
          <GlassCard glow="purple">
            <div className="p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Comments</h2>
                  <p className="text-white/40 text-xs">Portfolio visitor comments</p>
                </div>
                <Badge count={comments.length} color="#a855f7" />
              </div>
            </div>

            <div className="p-6">
              {loadingComments ? (
                <Spinner color="#a855f7" />
              ) : comments.length === 0 ? (
                <EmptyState icon={MessageSquare} text="No comments yet" />
              ) : (
                <div className="space-y-3 max-h-[560px] overflow-y-auto custom-scrollbar pr-1">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-purple-500/30 rounded-xl p-4 sm:p-5 transition-all duration-200"
                    >
                      <div className="flex justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                              {(c.userName || c.name || "?")[0].toUpperCase()}
                            </div>
                            <span className="font-bold text-sm">{c.userName || c.name}</span>
                            <span className="text-white/25 text-[11px] ml-auto">
                              {toDate(c.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed pl-9">{c.content || c.comment}</p>
                        </div>
                        <button
                          onClick={() => deleteComment(c.id)}
                          className="flex-shrink-0 w-8 h-8 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>
        )}

        {/* ══════════════════════════════════════
            TAB: SETTINGS
        ══════════════════════════════════════ */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* update email */}
            <GlassCard glow="indigo" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold">Update Email</h3>
                  <p className="text-white/40 text-xs">Change your admin email address</p>
                </div>
              </div>

              {!showEmailForm ? (
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:gap-3"
                  style={{ background: "linear-gradient(135deg, #6366f133, #818cf811)", border: "1px solid #6366f144", color: "#818cf8" }}
                >
                  Change Email <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <form onSubmit={handleEmailUpdate} className="space-y-3">
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Current Password"
                      value={emailDataWithPassword.currentPassword}
                      onChange={(e) => setEmailDataWithPassword({ ...emailDataWithPassword, currentPassword: e.target.value })}
                      className="w-full pl-10 pr-10 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                      required
                    />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <GlassInput icon={Mail} accentColor="#6366f1" type="email" placeholder="New Email"
                    value={emailDataWithPassword.newEmail}
                    onChange={(e) => setEmailDataWithPassword({ ...emailDataWithPassword, newEmail: e.target.value })} required />
                  <GlassInput icon={Mail} accentColor="#6366f1" type="email" placeholder="Confirm New Email"
                    value={emailDataWithPassword.confirmEmail}
                    onChange={(e) => setEmailDataWithPassword({ ...emailDataWithPassword, confirmEmail: e.target.value })} required />
                  <div className="flex gap-2 pt-1">
                    <button type="submit"
                      className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>
                      Update Email
                    </button>
                    <button type="button" onClick={() => setShowEmailForm(false)}
                      className="px-4 py-2.5 rounded-xl font-medium text-sm text-white/50 bg-white/[0.05] border border-white/10 hover:text-white/80 transition-all">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </GlassCard>

            {/* update password */}
            <GlassCard glow="purple" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold">Update Password</h3>
                  <p className="text-white/40 text-xs">Change your login password</p>
                </div>
              </div>

              {!showPasswordForm ? (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:gap-3"
                  style={{ background: "linear-gradient(135deg, #a855f733, #c084fc11)", border: "1px solid #a855f744", color: "#c084fc" }}
                >
                  Change Password <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <form onSubmit={handlePasswordUpdate} className="space-y-3">
                  {[
                    { placeholder: "Current Password", key: "currentPassword", show: showCurrentPassword, toggle: () => setShowCurrentPassword(!showCurrentPassword) },
                    { placeholder: "New Password",      key: "newPassword",     show: showNewPassword,     toggle: () => setShowNewPassword(!showNewPassword) },
                    { placeholder: "Confirm Password",  key: "confirmPassword", show: showConfirmPassword,  toggle: () => setShowConfirmPassword(!showConfirmPassword) },
                  ].map((f) => (
                    <div key={f.key} className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <input
                        type={f.show ? "text" : "password"}
                        placeholder={f.placeholder}
                        value={passwordData[f.key]}
                        onChange={(e) => setPasswordData({ ...passwordData, [f.key]: e.target.value })}
                        className="w-full pl-10 pr-10 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                        required
                      />
                      <button type="button" onClick={f.toggle}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                        {f.show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-1">
                    <button type="submit"
                      className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg,#a855f7,#c084fc)" }}>
                      Update Password
                    </button>
                    <button type="button" onClick={() => setShowPasswordForm(false)}
                      className="px-4 py-2.5 rounded-xl font-medium text-sm text-white/50 bg-white/[0.05] border border-white/10 hover:text-white/80 transition-all">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </GlassCard>

            {/* danger zone */}
            <GlassCard glow="red" className="p-6 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold">Danger Zone</h3>
                  <p className="text-white/40 text-xs">Irreversible actions</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                <div>
                  <p className="text-sm font-semibold">Sign out of admin panel</p>
                  <p className="text-white/40 text-xs mt-0.5">You will be redirected to the login page.</p>
                </div>
                <button
                  onClick={async () => { await signOut(auth); navigate("/login"); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 hover:border-red-500/60 transition-all flex-shrink-0"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </GlassCard>
          </div>
        )}

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        @keyframes slide-up { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AdminPage;
