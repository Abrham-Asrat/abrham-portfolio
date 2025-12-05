import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const blobRefs = useRef([]);
  const initialPositions = [
    { x: -4, y: 0 },
    { x: -4, y: 0 },
    { x: 20, y: -8 },
    { x: 20, y: -8 },
  ];

  useEffect(() => {
    let currentScroll = 0;
    let requestId;
    let lastUpdate = 0;
    const updateInterval = 16; // ~60fps
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestId = requestAnimationFrame(() => {
          const newScroll = window.pageYOffset;
          const now = performance.now();

          // Throttle updates to reduce CPU usage
          if (now - lastUpdate < updateInterval) {
            ticking = false;
            return;
          }

          lastUpdate = now;
          currentScroll = newScroll;

          blobRefs.current.forEach((blob, index) => {
            const initialPos = initialPositions[index];

            // Calculating movement in both X and Y direction
            const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340; // Horizontal movement
            const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40; // Vertical movement

            const x = initialPos.x + xOffset;
            const y = initialPos.y + yOffset;

            // Apply transformation with smooth transition
            blob.style.transform = `translate(${x}px, ${y}px)`;
            blob.style.transition = "transform 1.4s ease-out";
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 bg-black">
        {/* Static stars */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>

        {/* Animated stars */}
        <div
          className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-2/3 left-2/3 w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-twinkle"
          style={{ animationDelay: "1.5s", animationDuration: "4.5s" }}
        ></div>

        {/* Nebula blobs */}
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-500 rounded-full filter blur-[128px] opacity-10"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-10"
        ></div>
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full filter blur-[128px] opacity-10"
        ></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
