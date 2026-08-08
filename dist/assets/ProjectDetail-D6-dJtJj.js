import{W as u,_ as h,r as m,j as e,$ as b,a0 as f,E as g,G as v,C as x,S as j,a1 as N,d as w,a2 as y,a3 as k,b as o,a4 as I}from"./vendor-core-D7ZdDktX.js";import{aw as S}from"./vendor-utils-CT7Pkhqc.js";import"./vendor-animation-C6UcOTDB.js";const c={React:w,Tailwind:y,Express:k,Python:o,Javascript:o,HTML:o,CSS:o,default:I},T=({tech:t})=>{const l=c[t]||c.default;return e.jsxs("div",{className:"group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"}),e.jsxs("div",{className:"relative flex items-center gap-1.5 md:gap-2",children:[e.jsx(l,{className:"w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors"}),e.jsx("span",{className:"text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors",children:t})]})]})},C=({feature:t})=>e.jsxs("li",{className:"group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10",children:[e.jsxs("div",{className:"relative mt-2",children:[e.jsx("div",{className:"absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300"}),e.jsx("div",{className:"relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300"})]}),e.jsx("span",{className:"text-sm md:text-base text-gray-300 group-hover:text-white transition-colors",children:t})]}),L=({project:t})=>{var i,n;const l=((i=t==null?void 0:t.TechStack)==null?void 0:i.length)||0,a=((n=t==null?void 0:t.Features)==null?void 0:n.length)||0;return e.jsxs("div",{className:"grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0"}),e.jsxs("div",{className:"relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg",children:[e.jsx("div",{className:"bg-blue-500/20 p-1.5 md:p-2 rounded-full",children:e.jsx(x,{className:"text-blue-300 w-4 h-4 md:w-6 md:h-6",strokeWidth:1.5})}),e.jsxs("div",{className:"flex-grow",children:[e.jsx("div",{className:"text-lg md:text-xl font-semibold text-blue-200",children:l}),e.jsx("div",{className:"text-[10px] md:text-xs text-gray-400",children:"Total Teknologi"})]})]}),e.jsxs("div",{className:"relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg",children:[e.jsx("div",{className:"bg-purple-500/20 p-1.5 md:p-2 rounded-full",children:e.jsx(N,{className:"text-purple-300 w-4 h-4 md:w-6 md:h-6",strokeWidth:1.5})}),e.jsxs("div",{className:"flex-grow",children:[e.jsx("div",{className:"text-lg md:text-xl font-semibold text-purple-200",children:a}),e.jsx("div",{className:"text-[10px] md:text-xs text-gray-400",children:"Fitur Utama"})]})]})]})},P=t=>t==="Private"?(S.fire({icon:"info",title:"Source Code Private",text:"Maaf, source code untuk proyek ini bersifat privat.",confirmButtonText:"Mengerti",confirmButtonColor:"#3085d6",background:"#030014",color:"#ffffff"}),!1):!0,R=()=>{const{id:t}=u(),l=h(),[a,i]=m.useState(null),[n,p]=m.useState(!1);return m.useEffect(()=>{window.scrollTo(0,0);const s=(JSON.parse(localStorage.getItem("projects"))||[]).find(d=>String(d.id)===t);if(s){const d={...s,Features:s.Features||[],TechStack:s.TechStack||[],Github:s.Github||"https://github.com/EkiZR"};i(d)}},[t]),a?e.jsxs("div",{className:"min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden",children:[e.jsxs("div",{className:"fixed inset-0",children:[e.jsxs("div",{className:"absolute -inset-[10px] opacity-20",children:[e.jsx("div",{className:"absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"}),e.jsx("div",{className:"absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"}),e.jsx("div",{className:"absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"})]}),e.jsx("div",{className:"absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"})]}),e.jsx("div",{className:"relative",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16",children:[e.jsxs("div",{className:"flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn",children:[e.jsxs("button",{onClick:()=>l(-1),className:"group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base",children:[e.jsx(b,{className:"w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform"}),e.jsx("span",{children:"Back"})]}),e.jsxs("div",{className:"flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50",children:[e.jsx("span",{children:"Projects"}),e.jsx(f,{className:"w-3 h-3 md:w-4 md:h-4"}),e.jsx("span",{className:"text-white/90 truncate",children:a.Title})]})]}),e.jsxs("div",{className:"grid lg:grid-cols-2 gap-8 md:gap-16",children:[e.jsxs("div",{className:"space-y-6 md:space-y-10 animate-slideInLeft",children:[e.jsxs("div",{className:"space-y-4 md:space-y-6",children:[e.jsx("h1",{className:"text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight",children:a.Title}),e.jsxs("div",{className:"relative h-1 w-16 md:w-24",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm"})]})]}),e.jsx("div",{className:"prose prose-invert max-w-none",children:e.jsx("p",{className:"text-base md:text-lg text-gray-300/90 leading-relaxed",children:a.Description})}),e.jsx(L,{project:a}),e.jsxs("div",{className:"flex flex-wrap gap-3 md:gap-4",children:[e.jsxs("a",{href:a.Link,target:"_blank",rel:"noopener noreferrer",className:"group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base",children:[e.jsx("div",{className:"absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]"}),e.jsx(g,{className:"relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform"}),e.jsx("span",{className:"relative font-medium",children:"Live Demo"})]}),e.jsxs("a",{href:a.Github,target:"_blank",rel:"noopener noreferrer",className:"group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base",onClick:r=>!P(a.Github)&&r.preventDefault(),children:[e.jsx("div",{className:"absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]"}),e.jsx(v,{className:"relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform"}),e.jsx("span",{className:"relative font-medium",children:"Github"})]})]}),e.jsxs("div",{className:"space-y-4 md:space-y-6",children:[e.jsxs("h3",{className:"text-lg md:text-xl font-semibold text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3",children:[e.jsx(x,{className:"w-4 h-4 md:w-5 md:h-5 text-blue-400"}),"Technologies Used"]}),a.TechStack.length>0?e.jsx("div",{className:"flex flex-wrap gap-2 md:gap-3",children:a.TechStack.map((r,s)=>e.jsx(T,{tech:r},s))}):e.jsx("p",{className:"text-sm md:text-base text-gray-400 opacity-50",children:"No technologies added."})]})]}),e.jsxs("div",{className:"space-y-6 md:space-y-10 animate-slideInRight",children:[e.jsxs("div",{className:"relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"}),e.jsx("img",{src:a.Img,alt:a.Title,className:"w-full  object-cover transform transition-transform duration-700 group-hover:scale-105",onLoad:()=>p(!0)}),e.jsx("div",{className:"absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl"})]}),e.jsxs("div",{className:"bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group",children:[e.jsxs("h3",{className:"text-xl font-semibold text-white/90 flex items-center gap-3",children:[e.jsx(j,{className:"w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300"}),"Key Features"]}),a.Features.length>0?e.jsx("ul",{className:"list-none space-y-2",children:a.Features.map((r,s)=>e.jsx(C,{feature:r},s))}):e.jsx("p",{className:"text-gray-400 opacity-50",children:"No features added."})]})]})]})]})}),e.jsx("style",{jsx:"true",children:`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `})]}):e.jsx("div",{className:"min-h-screen bg-[#030014] flex items-center justify-center",children:e.jsxs("div",{className:"text-center space-y-6 animate-fadeIn",children:[e.jsx("div",{className:"w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"}),e.jsx("h2",{className:"text-xl md:text-3xl font-bold text-white",children:"Loading Project..."})]})})};export{R as default};
