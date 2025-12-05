import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Clock,
  UserCheck,
  Instagram,
} from "lucide-react";

const GithubProfile = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent mb-4">
          Hi, I'm Abrham Asrat 👋
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Full-Stack Web Developer | Software Engineering Student | Open to
          Remote Work & Collaboration
        </p>

        <div className="flex justify-center mt-6">
          <a
            href="https://github.com/Abrham-Asrat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>Follow on GitHub</span>
          </a>
        </div>
      </div>

      {/* What I Do Section */}
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-10">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-white">
          <div className="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center">
            <span className="fas fa-laptop-code"></span>
          </div>
          What I Do
        </h2>

        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#6366f1] mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">
              <strong className="text-white">Full-Stack Development:</strong>{" "}
              Building modern, scalable web applications using MEAN, MERN, and
              ASP.NET stacks.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#6366f1] mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">
              <strong className="text-white">UI/UX Design:</strong> Creating
              intuitive and accessible user experiences with a design-first
              approach.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#6366f1] mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">
              <strong className="text-white">Deployment & DevOps:</strong>{" "}
              Hosting and deployment via Netlify, Vercel, or custom VPS
              environments.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#6366f1] mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">
              <strong className="text-white">Version Control:</strong>{" "}
              Collaborating efficiently using Git/GitHub for seamless project
              management.
            </span>
          </li>
        </ul>
      </div>

      {/* Tech Stack Section */}
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-10">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-white">
          <div className="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center">
            <span className="fas fa-code"></span>
          </div>
          Tech Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Frontend</h3>
            <ul className="space-y-2 text-gray-300">
              <li>💫 Angular (Latest), React.js</li>
              <li>📄 HTML5, 🎨 CSS3, 🧪 JavaScript (ES6+), ⚙️ TypeScript</li>
              <li>🧱 Bootstrap, 💨 Tailwind CSS</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Backend</h3>
            <ul className="space-y-2 text-gray-300">
              <li>🌀 Node.js, 🏹 Express.js, 🛡️ ASP.NET Core</li>
              <li>🔄 RESTful API Development</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Databases</h3>
            <ul className="space-y-2 text-gray-300">
              <li>🗃️ MongoDB, 🗄️ Microsoft SQL Server, 🗄️ MySQL</li>
              <li>🔍 Data modeling, indexing, and optimized querying</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Tools & Other
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>🐙 Git / GitHub</li>
              <li>☁️ Deployment: Netlify, Vercel, VPS</li>
              <li>🤝 Agile workflows and team collaboration</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Skills Overview Section */}
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-10">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-white">
          <div className="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center">
            <span className="fas fa-cogs"></span>
          </div>
          Skills Overview
        </h2>

        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {/* HTML5 */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/732/732212.png"
              alt="HTML5"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">HTML5</span>
          </div>

          {/* CSS3 */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/732/732190.png"
              alt="CSS3"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">CSS3</span>
          </div>

          {/* JavaScript */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
              alt="JavaScript"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">JavaScript</span>
          </div>

          {/* Angular */}
          <div className="flex flex-col items-center">
            <img
              src="https://angular.io/assets/images/logos/angular/angular.svg"
              alt="Angular"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">Angular</span>
          </div>

          {/* TypeScript */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968381.png"
              alt="TypeScript"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">TypeScript</span>
          </div>

          {/* React */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1126/1126012.png"
              alt="React"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">React</span>
          </div>

          {/* ASP.NET */}
          <div className="flex flex-col items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/ee/.NET_Core_Logo.svg"
              alt="ASP.NET Core"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">ASP.NET Core</span>
          </div>

          {/* Node.js */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
              alt="Node.js"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">Node.js</span>
          </div>

          {/* SQL */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2772/2772128.png"
              alt="SQL"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">SQL</span>
          </div>

          {/* Bootstrap */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968672.png"
              alt="Bootstrap"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">Bootstrap</span>
          </div>

          {/* Git */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111288.png"
              alt="Git"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">Git</span>
          </div>

          {/* GitHub */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
              alt="GitHub"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">GitHub</span>
          </div>

          {/* Responsive Design */}
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1006/1006555.png"
              alt="Responsive Design"
              width="60"
              height="60"
            />
            <span className="mt-2 text-sm text-gray-300">
              Responsive Design
            </span>
          </div>
        </div>
      </div>

      {/* Why Work With Me Section */}
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-10">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-white">
          <div className="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center">
            <span className="fas fa-bolt"></span>
          </div>
          Why Work With Me?
        </h2>

        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#6366f1] mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">
              🌟 Proven hands-on experience building high-performance, scalable,
              and user-friendly web apps.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#6366f1] mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">
              🧠 Strong problem-solving mindset with attention to detail.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#6366f1] mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">
              🕒 Committed to on-time delivery and transparent communication.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-[#6366f1] mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">
              📦 Available for freelance projects — 20–30 hours per week.
            </span>
          </li>
        </ul>
      </div>

      {/* Connect Section */}
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-white">
          <div className="w-8 h-8 rounded-full bg-[#6366f1] flex items-center justify-center">
            <span className="fas fa-link"></span>
          </div>
          Let's Connect
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">
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
    </div>
  );
};

export default GithubProfile;
