import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  // Handle kasus ketika ProjectLink kosong
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full hover:scale-105 transition-transform duration-300 animate-fade-in">
      <div className="relative overflow-hidden rounded-xl bg-[#030014]/50 border border-gray-700 transition-all duration-300 hover:border-gray-600 hover:border-[#6366f1]/50 hover:shadow-lg hover:shadow-[#6366f1]/30 hover:scale-[1.02]">
        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-lg group-hover:animate-pulse-glow">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 group-hover:brightness-110"
            />
          </div>

          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold text-white group-hover:animate-glow transition-all duration-300">{Title}</h3>

            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
              {Description}
            </p>

            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                  href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-600 text-sm">
                  Demo Not Available
                </span>
              )}

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#030014] hover:bg-[#030014]/80 text-white transition-all duration-200 hover:scale-105"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-600 text-sm">
                  Details Not Available
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
