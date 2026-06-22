import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:py-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-4 sm:mb-6">
          <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-[#6366f1]" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Thank You!
        </h1>
        <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8">
          Your message has been received. I'll get back to you as soon as possible.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] text-sm sm:text-base"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;