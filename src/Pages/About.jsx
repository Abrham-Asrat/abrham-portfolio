import React, { useEffect, memo, useMemo } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  UserCheck,
  Linkedin,
  Mail,
  Github,
  Instagram,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <h2
      className="text-4xl md:text-5xl font-bold text-white"
      data-aos="zoom-in-up"
      data-aos-duration="600"
    >
      About Me
    </h2>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      Full-Stack Web Developer transforming ideas into digital experiences
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      {/* Rectangular profile image */}
      <div className="relative">
        <div className="w-72 h-96 sm:w-80 sm:h-[30rem] rounded-xl overflow-hidden border-4 border-gray-700 transform transition-all duration-700 group-hover:scale-105 shadow-2xl">
          <img
            src="/123.png"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Circular badge at the bottom inside */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border-4 border-gray-700 bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex items-center justify-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-white font-bold text-xl">AA</span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div
      data-aos={animation}
      data-aos-duration={1300}
      className="relative group"
    >
      <div className="relative z-10 bg-[#030014]/50 rounded-2xl p-6 border border-gray-700 overflow-hidden transition-all duration-300 hover:scale-[1.02] h-full flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#030014]/50">
            <Icon className="w-8 h-8 text-gray-300" />
          </div>
          <span
            className="text-4xl font-bold text-white"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>

        <div>
          <p
            className="text-sm uppercase tracking-wider text-gray-400 mb-2"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-xs text-gray-500"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
);

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    // Try to get data from localStorage first
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]"
    );

    // Define the actual counts based on what's in Portofolio.jsx
    const actualProjectsCount = 10; // 10 sample projects defined in Portofolio.jsx
    const actualCertificatesCount =
      storedCertificates.length > 0 ? storedCertificates.length : 4; // Fallback to 4 if no certificates in localStorage

    const startDate = new Date("2023-11-06");
    const today = new Date();
    const experience =
      today.getFullYear() -
      startDate.getFullYear() -
      (today <
      new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
        ? 1
        : 0);

    return {
      totalProjects:
        storedProjects.length > 0 ? storedProjects.length : actualProjectsCount,
      totalCertificates:
        storedCertificates.length > 0
          ? storedCertificates.length
          : actualCertificatesCount,
      YearExperience: experience,
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true, // Only animate elements once
        duration: 800, // Reduce animation duration
        easing: "ease-out-quart",
      });
    };

    initAOS();

    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalProjects,
        label: "Total Projects",
        description: "Innovative web solutions crafted",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional skills validated",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: `${YearExperience}+`,
        label: "Years of Experience",
        description: "Continuous learning journey",
        animation: "fade-left",
      },
    ],
    [totalProjects, totalCertificates, YearExperience]
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Abrham Asrat
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Full-Stack Web Developer with expertise in building modern,
              scalable web applications using MEAN, MERN, and ASP.NET stacks. I
              specialize in creating intuitive and accessible user experiences
              with a design-first approach. I'm experienced in deployment via
              Netlify, Vercel, and custom VPS environments, and collaborate
              efficiently using Git/GitHub.
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a
                href="/Abrham_Asrat_CV.pdf"
                download
                className="w-full lg:w-auto"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>
              <a href="#Portofolio" className="w-full lg:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10 animate-bounce-slow delay-200"
                >
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4 mt-4 flex-wrap">
              <a
                href="https://www.linkedin.com/in/abrham-asrat-8862b8366"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/abrham-asrat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.instagram.com/abrham_asrat12"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-pink-800 hover:bg-pink-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a
                href="https://tiktok.com/@abrifana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black hover:bg-gray-900 px-4 py-2 rounded-lg transition-colors"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 45 45"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>Tiktok</title>
                  <g
                    id="Icon/Social/tiktok-color"
                    stroke="none"
                    strokeWidth="8"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g id="Group-7" transform="translate(8.000000, 6.000000)">
                      <path
                        d="M29.5248245,9.44576327 C28.0821306,9.0460898 26.7616408,8.29376327 25.6826204,7.25637551 C25.5109469,7.09719184 25.3493143,6.92821224 25.1928245,6.75433469 C23.9066204,5.27833469 23.209151,3.38037551 23.2336408,1.42290612 L17.3560898,1.42290612 L17.3560898,23.7086204 C17.3560898,27.7935184 15.1520082,29.9535184 12.416498,29.9535184 C11.694049,29.9611102 10.9789469,29.8107429 10.3213959,29.5124571 C9.6636,29.2144163 9.07951837,28.7758041 8.60955918,28.2272327 C8.1398449,27.6789061 7.79551837,27.0340898 7.60180408,26.3385796 C7.4078449,25.6430694 7.36890612,24.9132735 7.48743673,24.2008653 C7.60596735,23.4884571 7.87902857,22.8105796 8.28751837,22.2154776 C8.69625306,21.6198857 9.23037551,21.1212735 9.85241633,20.7546612 C10.474702,20.3878041 11.1694776,20.1617633 11.8882531,20.0924571 C12.6070286,20.023151 13.3324163,20.1122939 14.0129878,20.3535184 L14.0129878,14.3584163 C13.4889061,14.2430694 12.9530694,14.1862531 12.416498,14.1894367 L12.3917633,14.1894367 C10.2542939,14.1943347 8.16604898,14.8325388 6.39127347,16.0234776 C4.61649796,17.2149061 3.23429388,18.9051918 2.41976327,20.8812735 C1.60523265,22.8578449 1.39486531,25.0310694 1.8151102,27.1269061 C2.2351102,29.2227429 3.2671102,31.1469061 4.78033469,32.6564571 C6.29380408,34.1660082 8.22066122,35.1933551 10.3174776,35.6082122 C12.4142939,36.0230694 14.5870286,35.8073143 16.561151,34.9878857 C18.5355184,34.1682122 20.2226204,32.7820898 21.409151,31.0041306 C22.5959265,29.2264163 23.2289878,27.136702 23.228498,24.9992327 L23.228498,12.8155592 C25.5036,14.392702 28.2244163,15.134498 31.1289061,15.1886204 L31.1289061,9.68551837 C30.5869469,9.66568163 30.049151,9.5851102 29.5248245,9.44576327"
                        id="Fill-1"
                        fill="#FE2C55"
                      ></path>
                      <path
                        d="M25.195102,6.75428571 C24.7946939,6.47510204 24.4148571,6.1675102 24.0587755,5.83346939 C22.8210612,4.66016327 22.0062857,3.11020408 21.7420408,1.42530612 C21.6622041,0.954367347 21.6220408,0.47755102 21.6220408,0 L15.7444898,0 L15.7444898,22.6408163 C15.7444898,27.5069388 13.5404082,28.5183673 10.804898,28.5183673 C10.0829388,28.5262041 9.36783673,28.3758367 8.71028571,28.0773061 C8.0524898,27.7792653 7.46791837,27.3406531 6.99820408,26.7920816 C6.5282449,26.2437551 6.18440816,25.5989388 5.99044898,24.9034286 C5.7964898,24.2079184 5.75755102,23.4781224 5.87583673,22.7657143 C5.99461224,22.053551 6.26767347,21.3756735 6.67640816,20.7800816 C7.08489796,20.1847347 7.61902041,19.6861224 8.24106122,19.3195102 C8.86334694,18.952898 9.55787755,18.7266122 10.276898,18.6573061 C10.9959184,18.588 11.7208163,18.6773878 12.4016327,18.9183673 L12.4016327,12.9328163 C5.40489796,11.8236735 0,17.4783673 0,23.5760816 C0.00465306122,26.4426122 1.14514286,29.1898776 3.17191837,31.216898 C5.19869388,33.2434286 7.94595918,34.3839184 10.8124898,34.3885714 C16.7730612,34.3885714 21.6220408,30.7444898 21.6220408,23.5760816 L21.6220408,11.3924082 C23.8995918,12.9795918 26.6204082,13.7142857 29.524898,13.7632653 L29.524898,8.26040816 C27.9658776,8.18914286 26.4617143,7.66604082 25.195102,6.75428571"
                        id="Fill-3"
                        fill="#25F4EE"
                      ></path>
                      <path
                        d="M21.6220653,23.5764245 L21.6220653,11.392751 C23.8996163,12.9794449 26.6204327,13.7141388 29.5251673,13.7633633 L29.5251673,9.44581224 C28.0822286,9.04613878 26.7617388,8.29381224 25.6824735,7.25617959 C25.5110449,7.09724082 25.3494122,6.92826122 25.1926776,6.75438367 C24.7922694,6.4752 24.4126776,6.16736327 24.056351,5.83356735 C22.8186367,4.66026122 22.0041061,3.11030204 21.7396163,1.42540408 L17.3730857,1.42540408 L17.3730857,23.7111184 C17.3730857,27.7957714 15.1690041,29.9560163 12.4334939,29.9560163 C11.6569224,29.9538122 10.8918612,29.7681796 10.2005143,29.414302 C9.50941224,29.0601796 8.91186122,28.5476082 8.45635102,27.9182204 C7.49071837,27.3946286 6.72712653,26.5636898 6.2865551,25.5571592 C5.84573878,24.5508735 5.75341224,23.4260571 6.02377959,22.3609959 C6.29390204,21.2959347 6.91177959,20.3516082 7.77896327,19.6771592 C8.64639184,19.0027102 9.71365714,18.6365878 10.8122694,18.6365878 C11.3564327,18.6412408 11.8961878,18.7362612 12.4090041,18.9182204 L12.4090041,14.1894857 C10.304351,14.1921796 8.24647347,14.8093224 6.48786122,15.9657306 C4.72924898,17.1221388 3.3470449,18.7666286 2.51047347,20.6978939 C1.67390204,22.6291592 1.41969796,24.7627102 1.77896327,26.8362612 C2.13822857,28.9098122 3.09553469,30.8334857 4.53308571,32.3704653 C6.36271837,33.6848327 8.55945306,34.3906286 10.8122694,34.3884296 C16.7730857,34.3884296 21.6220653,30.7445878 21.6220653,23.5764245"
                        id="Fill-5"
                        fill="#000000"
                      ></path>
                    </g>
                  </g>
                </svg>
                <span>TikTok</span>
              </a>
              <a
                href="https://t.me/abrham_asrat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-sky-800 hover:bg-sky-700 px-4 py-2 rounded-lg transition-colors"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Telegram</title>
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.57-4.458c.538-.196 1.006.128.832.941z"
                    fill="#ffffff"
                  />
                </svg>
                <span>Telegram</span>
              </a>
              <a
                href="mailto:abrhamasrat29@gmail.com"
                className="flex items-center gap-2 bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style jsx="true">{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
