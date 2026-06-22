import React from "react";

const TechStackIcon = ({ TechStackIcon, Language }) => {
  return (
    <div className="group p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-125 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/30 animate-fade-in hover:animate-float">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-75 blur transition duration-300 group-hover:animate-pulse-glow"></div>
        <img
          src={TechStackIcon}
          alt={`${Language} icon`}
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300 group-hover:rotate-12 group-hover:drop-shadow-lg group-hover:drop-shadow-blue-500/50 group-hover:brightness-125"
        />
      </div>
      <span className="text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300 group-hover:animate-glow">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;
