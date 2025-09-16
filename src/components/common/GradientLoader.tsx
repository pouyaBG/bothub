import React from "react";

const GradientLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 animate-gradient-x">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 animate-pulse"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-400/30 rounded-full animate-bounce"></div>
        <div
          className="absolute top-1/2 right-1/4 w-1 h-1 bg-cyan-400/30 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}></div>
        <div
          className="absolute top-1/3 left-1/2 w-1 h-1 bg-pink-400/30 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Main loader container */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Spinning circle with gradient border */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 w-16 h-16 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-full animate-pulse blur-sm"></div>

          {/* Main spinning ring */}
          <div
            className="relative w-16 h-16 bg-gradient-to-tr from-blue-500 via-purple-500 to-indigo-500 rounded-full animate-spin"
            style={{ animationDuration: "2s" }}>
            <div className="absolute inset-2 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 rounded-full"></div>
          </div>

          {/* Inner rotating dots */}
          <div
            className="absolute inset-0 w-16 h-16 animate-spin"
            style={{ animationDuration: "3s", animationDirection: "reverse" }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full"></div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-indigo-400 rounded-full"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
          </div>
        </div>

        {/* Loading text with gradient */}
        <div className="text-center">
          <div className="mt-2 flex justify-center space-x-1 space-x-reverse">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}></div>
            <div
              className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientLoader;
