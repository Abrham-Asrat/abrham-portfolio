import { useState, useEffect, useCallback, memo } from "react";
import {
  Github, Linkedin, Mail, Instagram,
  Download, ArrowRight, Code2, Zap, Star,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ─── constants ─────────────────────────────────────── */
const TYPING_SPEED   = 90;
const ERASING_SPEED  = 45;
const PAUSE_DURATION = 2200;
const WORDS = ["Full-Stack Developer", "Software Engineer", "UI/UX Enthusiast"];
const TECH_STACK = ["React", "Angular", "TypeScript", "Node.js", "ASP.NET", "Tailwind"];

const SOCIAL_LINKS = [
  { icon: Github,    link: "https://github.com/abrham-asrat",                    label: "GitHub" },
  { icon: Linkedin,  link: "https://www.linkedin.com/in/abrham-asrat-8862b8366", label: "LinkedIn" },
  { icon: Mail,      link: "mailto:abrhamasrat29@gmail.com",                     label: "Email" },
  { icon: Instagram, link: "https://www.instagram.com/abrham_asrat12",           label: "Instagram" },
  {
    label: "Telegram",
    link: "https://t.me/abrham_asrat",
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.57-4.458c.538-.196 1.006.128.832.941z" fill="#0088cc"/>
      </svg>
    ),
  },
];

/* ─── floating particle ──────────────────────────────── */
const Particle = memo(({ style }) => (
  <div className="absolute rounded-full pointer-events-none" style={{
    width: style.size, height: style.size,
    left: style.x, top: style.y,
    background: style.color, filter: "blur(1px)",
    animation: `floatParticle ${style.duration}s ease-in-out infinite`,
    animationDelay: style.delay, opacity: style.opacity,
  }} />
));

/* ─── blinking cursor ────────────────────────────────── */
const Cursor = () => (
  <span className="inline-block w-[2px] h-[1em] bg-gradient-to-b from-indigo-400 to-purple-500 ml-1 rounded-full align-middle"
    style={{ animation: "blink 1s step-end infinite" }} />
);

/* ─── tech badge ─────────────────────────────────────── */
const TechBadge = memo(({ tech }) => (
  <span className="px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-sm text-white/70 hover:bg-white/[0.1] hover:border-indigo-500/40 hover:text-white transition-all duration-300 cursor-default">
    {tech}
  </span>
));

/* ─── stat item ──────────────────────────────────────── */
const StatItem = memo(({ value, label, icon: Icon, color }) => (
  <div className="flex flex-col items-center gap-0.5 cursor-default min-w-0">
    <div className="text-xl sm:text-2xl font-black tracking-tight"
      style={{ background: color, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
      {value}
    </div>
    <div className="flex items-center gap-1 text-white/40 text-[10px] sm:text-[11px] uppercase tracking-wider whitespace-nowrap">
      <Icon className="w-2.5 h-2.5 flex-shrink-0" />{label}
    </div>
  </div>
));

/* ─── social button ──────────────────────────────────── */
const SocialBtn = memo(({ icon: Icon, link, label }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="group relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
    <div className="relative flex items-center justify-center w-full h-full rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/30 hover:bg-white/[0.1] transition-all duration-300 hover:scale-110 active:scale-95">
      <Icon className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" />
    </div>
  </a>
));

/* ─── CTA button ─────────────────────────────────────── */
const CTABtn = memo(({ href, label, icon: Icon, primary, download }) => (
  <a href={href} download={download} target={download ? "_blank" : undefined} rel={download ? "noopener noreferrer" : undefined}>
    <button
      className={`group relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 ${
        primary
          ? "text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          : "text-white/80 border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/20 hover:text-white"
      }`}
      style={primary ? { background: "linear-gradient(135deg,#6366f1,#a855f7)" } : {}}
    >
      {primary && <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
      <span className="relative z-10">{label}</span>
      <Icon className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
    </button>
  </a>
));

/* ─── availability badge ─────────────────────────────── */
const AvailabilityBadge = () => (
  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] sm:text-xs font-semibold"
    data-aos="fade-down" data-aos-delay="200">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
    </span>
    Available for new projects
  </div>
);

/* ─── code window (hidden on small mobile, shown sm+) ── */
const CodeWindow = memo(() => {
  const lines = [
    { indent: 0, tokens: [{ t: "const ", c: "#a78bfa" }, { t: "developer", c: "#e2e8f0" }, { t: " = {", c: "#94a3b8" }] },
    { indent: 1, tokens: [{ t: "name: ", c: "#94a3b8" }, { t: '"Abrham Asrat"', c: "#86efac" }, { t: ",", c: "#94a3b8" }] },
    { indent: 1, tokens: [{ t: "role: ", c: "#94a3b8" }, { t: '"Full-Stack Dev"', c: "#86efac" }, { t: ",", c: "#94a3b8" }] },
    { indent: 1, tokens: [{ t: "stack: ", c: "#94a3b8" }, { t: "[ React, Node, .NET ]", c: "#7dd3fc" }, { t: ",", c: "#94a3b8" }] },
    { indent: 1, tokens: [{ t: "status: ", c: "#94a3b8" }, { t: '"open to work"', c: "#fde68a" }, { t: ",", c: "#94a3b8" }] },
    { indent: 0, tokens: [{ t: "};", c: "#94a3b8" }] },
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [{ t: "developer.", c: "#e2e8f0" }, { t: "build", c: "#60a5fa" }, { t: "(", c: "#94a3b8" }, { t: '"amazing"', c: "#86efac" }, { t: ");", c: "#94a3b8" }] },
  ];
  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto mt-6 sm:mt-0" data-aos="fade-up" data-aos-delay="400">
      <div className="absolute -inset-3 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl" />
      <div className="relative bg-[#0d0d1a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* title bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.07] bg-white/[0.02]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 text-white/30 text-[11px] font-mono">portfolio.ts</span>
        </div>
        {/* code */}
        <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-[13px] leading-6 sm:leading-7 select-none overflow-x-auto">
          {lines.map((line, li) => (
            <div key={li} className="flex" style={{ paddingLeft: `${line.indent * 14}px` }}>
              <span className="w-5 text-white/20 text-[10px] mr-2 sm:mr-3 select-none flex-shrink-0">{li + 1}</span>
              <span className="whitespace-nowrap">
                {line.tokens.map((tok, ti) => <span key={ti} style={{ color: tok.c }}>{tok.t}</span>)}
              </span>
            </div>
          ))}
        </div>
        {/* status bar */}
        <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/[0.05] bg-indigo-500/5">
          <span className="text-[10px] text-indigo-400/70 font-mono">TypeScript</span>
          <span className="text-[10px] text-white/30 font-mono">✓ No issues</span>
        </div>
      </div>
      {/* floating badges — repositioned to avoid overflow on mobile */}
      <div className="absolute -top-3 right-2 sm:-top-4 sm:-right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-xl border border-white/10 text-[10px] sm:text-[11px] font-semibold text-white/70"
        style={{ animation: "floatY 3s ease-in-out infinite" }}>
        <Zap className="w-3 h-3 text-yellow-400" /> Fast Delivery
      </div>
      <div className="absolute -bottom-3 left-2 sm:-bottom-4 sm:-left-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.07] backdrop-blur-xl border border-white/10 text-[10px] sm:text-[11px] font-semibold text-white/70"
        style={{ animation: "floatY 3.5s ease-in-out infinite reverse" }}>
        <Star className="w-3 h-3 text-purple-400" /> Clean Code
      </div>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════ */
const Home = () => {
  const [text, setText]           = useState("");
  const [isTyping, setIsTyping]   = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded]   = useState(false);
  const [techStack, setTechStack] = useState(TECH_STACK);
  const [particles]               = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: `${Math.random() * 3 + 2}px`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      color: i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#a855f7" : "#06b6d4",
      duration: Math.random() * 6 + 4,
      delay: `${Math.random() * -8}s`,
      opacity: Math.random() * 0.35 + 0.1,
    }))
  );

  useEffect(() => {
    AOS.init({ once: true, offset: 20, duration: 700, easing: "ease-out-cubic" });
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const { db, collection } = await import("../firebase");
        const { getDocs } = await import("firebase/firestore");
        const snap = await getDocs(collection(db, "techstacks"));
        if (!snap.empty) setTechStack(snap.docs.map(d => d.data().name).slice(0, 6));
      } catch { /* silent */ }
    };
    fetchTech();
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(p => p + WORDS[wordIndex][charIndex]);
        setCharIndex(p => p + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(p => p.slice(0, -1));
        setCharIndex(p => p - 1);
      } else {
        setWordIndex(p => (p + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const t = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(t);
  }, [handleTyping]);

  return (
    <div className="min-h-screen bg-[#030014] overflow-x-hidden relative pt-16" id="Home">

      {/* ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full bg-purple-600/[0.07] blur-[120px]" />
        <div className="absolute -bottom-48 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-600/[0.05] blur-[100px]" />
      </div>

      {/* particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map(p => <Particle key={p.id} style={p} />)}
      </div>

      {/* subtle grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── page content ── */}
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between
                          min-h-[calc(100vh-64px)] gap-8 sm:gap-10 lg:gap-16
                          py-10 sm:py-14 lg:py-0">

            {/* ══ LEFT COLUMN ══ */}
            <div className="w-full lg:w-[52%] flex flex-col items-center lg:items-start
                            text-center lg:text-left space-y-5 sm:space-y-6 order-2 lg:order-1">

              <AvailabilityBadge />

              {/* name */}
              <div className="space-y-1 sm:space-y-2" data-aos="fade-up" data-aos-delay="300">
                <p className="text-white/40 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">Hi, I'm</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                  <span className="block" style={{ background: "linear-gradient(135deg,#ffffff 0%,#c7d2fe 50%,#e9d5ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Abrham
                  </span>
                  <span className="block mt-1" style={{ background: "linear-gradient(135deg,#6366f1 0%,#a855f7 60%,#06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200%", animation: "gradient-shift 4s ease infinite" }}>
                    Asrat
                  </span>
                </h1>
              </div>

              {/* typing */}
              <div className="flex items-center justify-center lg:justify-start gap-2 h-7 sm:h-8"
                data-aos="fade-up" data-aos-delay="450">
                <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 flex-shrink-0" />
                <span className="text-base sm:text-lg md:text-xl text-white/70 font-light">{text}</span>
                <Cursor />
              </div>

              {/* description */}
              <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-lg"
                data-aos="fade-up" data-aos-delay="550">
                Full-Stack Developer specializing in{" "}
                <span className="text-indigo-400 font-medium">MEAN</span>,{" "}
                <span className="text-purple-400 font-medium">MERN</span>, and{" "}
                <span className="text-cyan-400 font-medium">ASP.NET</span> stacks — design-first & accessible.
              </p>

              {/* tech badges */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start"
                data-aos="fade-up" data-aos-delay="650">
                {techStack.map(t => <TechBadge key={t} tech={t} />)}
              </div>

              {/* stats row */}
              <div className="flex items-center gap-4 sm:gap-6 md:gap-8 py-4 sm:py-5 px-4 sm:px-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm"
                data-aos="fade-up" data-aos-delay="750">
                <StatItem value="10+" label="Projects"   icon={Code2} color="linear-gradient(135deg,#6366f1,#818cf8)" />
                <div className="w-px h-7 sm:h-8 bg-white/10 flex-shrink-0" />
                <StatItem value="2+"  label="Years Exp"  icon={Zap}   color="linear-gradient(135deg,#a855f7,#c084fc)" />
                <div className="w-px h-7 sm:h-8 bg-white/10 flex-shrink-0" />
                <StatItem value="5+"  label="Tech Stack" icon={Star}  color="linear-gradient(135deg,#06b6d4,#67e8f9)" />
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start"
                data-aos="fade-up" data-aos-delay="850">
                <CTABtn href="#Portofolio"          label="View Projects" icon={ArrowRight} primary />
                <CTABtn href="#Contact"             label="Contact Me"    icon={Mail} />
                <CTABtn href="/Abrham_Asrat_CV.pdf" label="Download CV"   icon={Download} download />
              </div>

              {/* social links */}
              <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start"
                data-aos="fade-up" data-aos-delay="950">
                <span className="text-white/25 text-[10px] sm:text-xs uppercase tracking-widest">Follow</span>
                <div className="w-6 sm:w-8 h-px bg-white/10" />
                {SOCIAL_LINKS.map(s => <SocialBtn key={s.label} {...s} />)}
              </div>
            </div>

            {/* ══ RIGHT COLUMN ══ */}
            <div className="w-full lg:w-[44%] order-1 lg:order-2 flex flex-col items-center gap-6 sm:gap-8">

              {/* profile photo */}
              <div className="relative" data-aos="zoom-in" data-aos-delay="200">
                {/* spinning conic ring */}
                <div className="absolute -inset-2 sm:-inset-3 rounded-3xl opacity-40"
                  style={{
                    background: "conic-gradient(from 0deg,#6366f1,#a855f7,#06b6d4,#6366f1)",
                    filter: "blur(12px)",
                    animation: "spin 8s linear infinite",
                  }}
                />
                {/* glass frame */}
                <div className="relative bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 sm:p-2 shadow-2xl">
                  <div className="w-44 h-56 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-64 lg:h-80 rounded-xl overflow-hidden">
                    <img
                      src="/ab.jpg"
                      alt="Abrham Asrat"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={e => { e.target.src = "/photo.jpg"; }}
                    />
                  </div>
                  {/* online pill */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#030014]/80 backdrop-blur-xl border border-white/10 whitespace-nowrap">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-white/80">Abrham Asrat</span>
                  </div>
                </div>
              </div>

              {/* code window */}
              <CodeWindow />
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatParticle {
          0%,100% { transform: translateY(0) translateX(0); }
          33%      { transform: translateY(-12px) translateX(6px); }
          66%      { transform: translateY(6px) translateX(-6px); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-6px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-shift {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default memo(Home);
