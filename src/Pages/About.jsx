import React, { useEffect, useState, memo, useMemo } from "react";
import {
  FileText, Code, Award, Globe, ArrowUpRight,
  Linkedin, Mail, Github, Instagram, CheckCircle2,
  Briefcase, GraduationCap, Heart,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ─── glass stat card ──────────────────────────────── */
const StatCard = memo(({ icon: Icon, value, label, description, color, animation, delay }) => (
  <div data-aos={animation} data-aos-delay={delay}>
    <div className="group relative bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 overflow-hidden hover:border-white/20 transition-all duration-400 hover:scale-[1.02] hover:bg-white/[0.07] cursor-default">
      {/* glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${color}22, transparent 60%)` }}
      />
      {/* icon + value row */}
      <div className="relative flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span
          className="text-4xl font-black tracking-tight"
          style={{ background: `linear-gradient(135deg, ${color}, white)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          {value}
        </span>
      </div>
      {/* text */}
      <p className="relative text-xs uppercase tracking-widest text-white/40 font-semibold mb-1">{label}</p>
      <p className="relative text-white/50 text-sm">{description}</p>
    </div>
  </div>
));

/* ─── skill pill ───────────────────────────────────── */
const SkillPill = memo(({ name, level, color }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-xs">
      <span className="text-white/70 font-medium">{name}</span>
      <span className="text-white/30">{level}%</span>
    </div>
    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{ width: `${level}%`, background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        data-aos="width"
      />
    </div>
  </div>
));

/* ─── social link row ──────────────────────────────── */
const SocialRow = memo(({ icon: Icon, label, href, color, username }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300"
  >
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
      style={{ background: `${color}22` }}
    >
      <Icon className="w-4 h-4" style={{ color }} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{label}</p>
      <p className="text-xs text-white/35 truncate">{username}</p>
    </div>
    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
  </a>
));

/* ─── timeline item ────────────────────────────────── */
const TimelineItem = memo(({ year, title, org, desc, icon: Icon, color, last }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border"
        style={{ background: `${color}20`, borderColor: `${color}40` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      {!last && <div className="w-px flex-1 mt-2 bg-white/[0.07]" />}
    </div>
    <div className={`pb-6 ${last ? "" : ""}`}>
      <p className="text-[11px] text-white/30 font-medium uppercase tracking-widest mb-1">{year}</p>
      <p className="text-sm font-bold text-white/90">{title}</p>
      <p className="text-xs text-white/50 mb-1">{org}</p>
      <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
    </div>
  </div>
));

/* ═══════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════ */
const AboutPage = () => {
  const [cvUrl, setCvUrl] = useState("/Abrham_Asrat_CV.pdf");

  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const stored = JSON.parse(localStorage.getItem("projects") || "[]");
    const certs  = JSON.parse(localStorage.getItem("certificates") || "[]");
    const start  = new Date("2023-11-06");
    const today  = new Date();
    const exp = today.getFullYear() - start.getFullYear() -
      (today < new Date(today.getFullYear(), start.getMonth(), start.getDate()) ? 1 : 0);
    return {
      totalProjects:      stored.length > 0 ? stored.length : 10,
      totalCertificates:  certs.length  > 0 ? certs.length  : 0,
      YearExperience:     exp,
    };
  }, []);

  useEffect(() => {
    AOS.init({ once: true, duration: 700, easing: "ease-out-cubic" });

    const fetchCV = async () => {
      try {
        const { db, collection } = await import("../firebase");
        const { getDocs, query, orderBy, limit } = await import("firebase/firestore");
        const q = query(collection(db, "cv"), orderBy("timestamp", "desc"), limit(1));
        const snap = await getDocs(q);
        if (!snap.empty) setCvUrl(snap.docs[0].data().url);
      } catch { /* silent */ }
    };
    fetchCV();
  }, []);

  const stats = useMemo(() => [
    { icon: Code,   value: `${totalProjects}+`, label: "Projects",        description: "Web apps shipped", color: "#6366f1", animation: "fade-up",       delay: 100 },
    { icon: Award,  value: totalCertificates,    label: "Certificates",    description: "Skills validated",  color: "#a855f7", animation: "fade-up",       delay: 200 },
    { icon: Globe,  value: `${YearExperience}+`, label: "Years Exp",      description: "Learning journey",  color: "#06b6d4", animation: "fade-up",       delay: 300 },
  ], [totalProjects, totalCertificates, YearExperience]);

  const skills = [
    { name: "React / Angular",  level: 90, color: "#6366f1" },
    { name: "Node.js / Express",level: 82, color: "#a855f7" },
    { name: "ASP.NET / C#",     level: 78, color: "#06b6d4" },
    { name: "TypeScript",        level: 85, color: "#818cf8" },
    { name: "SQL / Firebase",    level: 80, color: "#c084fc" },
    { name: "UI/UX / Tailwind",  level: 88, color: "#67e8f9" },
  ];

  const timeline = [
    {
      year: "2023 – Present",
      title: "Full-Stack Developer",
      org: "Freelance & Personal Projects",
      desc: "Building scalable web apps with MEAN, MERN & ASP.NET stacks.",
      icon: Briefcase,
      color: "#6366f1",
    },
    {
      year: "2023",
      title: "Started Software Engineering",
      org: "Self-taught & Online Courses",
      desc: "Deep-dived into React, Node.js, TypeScript and modern CSS.",
      icon: GraduationCap,
      color: "#a855f7",
    },
    {
      year: "Ongoing",
      title: "Open Source & Community",
      org: "GitHub & Dev Community",
      desc: "Contributing projects, building in public, and helping others.",
      icon: Heart,
      color: "#06b6d4",
      last: true,
    },
  ];

  const socials = [
    { icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/abrham-asrat-8862b8366", color: "#0A66C2", username: "Abrham Asrat" },
    { icon: Github,    label: "GitHub",    href: "https://github.com/abrham-asrat",                     color: "#e2e8f0", username: "@abrham-asrat" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/abrham_asrat12",            color: "#E4405F", username: "@abrham_asrat12" },
    { icon: Mail,      label: "Email",     href: "mailto:abrhamasrat29@gmail.com",                      color: "#EA4335", username: "abrhamasrat29@gmail.com" },
  ];

  return (
    <div className="bg-[#030014] text-white overflow-hidden" id="About">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-20 sm:py-28">

        {/* ── section header ── */}
        <div className="text-center mb-16 sm:mb-20" data-aos="fade-up">
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] font-semibold mb-3">Who I am</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 40%, #e9d5ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              About Me
            </span>
          </h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto text-sm sm:text-base">
            A Full-Stack developer who loves turning complex problems into elegant, fast, and accessible digital experiences.
          </p>
        </div>

        {/* ── top grid: photo + bio ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">

          {/* bio column */}
          <div className="space-y-6 order-2 lg:order-1" data-aos="fade-right" data-aos-delay="100">
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-black">
                <span style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Hello, I'm
                </span>
                <span className="block text-white mt-1">Abrham Asrat</span>
              </h3>
            </div>

            <p className="text-white/50 leading-relaxed text-sm sm:text-base">
              Full-Stack Web Developer with expertise in building modern, scalable web applications
              using <span className="text-indigo-400 font-medium">MEAN</span>,{" "}
              <span className="text-purple-400 font-medium">MERN</span>, and{" "}
              <span className="text-cyan-400 font-medium">ASP.NET</span> stacks. I specialize in
              creating intuitive, accessible user experiences with a design-first approach. Experienced
              in deploying via Netlify, Vercel, and custom VPS environments.
            </p>

            {/* key points */}
            <ul className="space-y-2">
              {[
                "Clean, maintainable, well-documented code",
                "Responsive & mobile-first design approach",
                "Performance optimization & accessibility",
                "CI/CD, Git workflows, and agile practices",
              ].map(pt => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-white/60">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  {pt}
                </li>
              ))}
            </ul>

            {/* buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={cvUrl} target="_blank" rel="noopener noreferrer" download>
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-95 transition-all duration-300"
                  style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}>
                  <FileText className="w-4 h-4" /> Download CV
                </button>
              </a>
              <a href="#Portofolio">
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/20 hover:text-white hover:scale-[1.03] active:scale-95 transition-all duration-300">
                  <Code className="w-4 h-4" /> View Projects
                </button>
              </a>
            </div>
          </div>

          {/* photo + socials column */}
          <div className="order-1 lg:order-2" data-aos="fade-left" data-aos-delay="200">
            <div className="flex flex-col items-center sm:items-start gap-6">
              {/* photo card */}
              <div className="relative mx-auto sm:mx-0">
                <div className="absolute -inset-3 rounded-3xl opacity-30"
                  style={{ background: "conic-gradient(from 0deg,#6366f1,#a855f7,#06b6d4,#6366f1)", filter: "blur(14px)", animation: "rotate-slow 10s linear infinite" }} />
                <div className="relative bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
                  <div className="w-52 h-64 sm:w-60 sm:h-72 lg:w-64 lg:h-80 rounded-xl overflow-hidden">
                    <img
                      src="/123.png"
                      alt="Abrham Asrat"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      onError={e => { e.target.src = "/photo.jpg"; }}
                    />
                  </div>
                  {/* initials badge */}
                  <div className="absolute -bottom-4 -right-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 border-2 border-[#030014]">
                    <span className="text-white font-black text-sm">AA</span>
                  </div>
                </div>
              </div>

              {/* socials grid */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                {socials.map(s => <SocialRow key={s.label} {...s} />)}
              </div>
            </div>
          </div>
        </div>

        {/* ── stat cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16" data-aos="fade-up" data-aos-delay="100">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* ── skills + timeline ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* skills */}
          <div
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] rounded-2xl p-6 sm:p-8"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full inline-block" />
              Technical Skills
            </h4>
            <div className="space-y-4">
              {skills.map(s => <SkillPill key={s.name} {...s} />)}
            </div>
          </div>

          {/* timeline */}
          <div
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] rounded-2xl p-6 sm:p-8"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-6 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full inline-block" />
              Journey
            </h4>
            <div>
              {timeline.map((item, i) => (
                <TimelineItem key={i} {...item} last={i === timeline.length - 1} />
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes rotate-slow { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
