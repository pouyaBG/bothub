import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated circles */}
      <div className="absolute inset-0">
        {/* Large slow circles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-bounce-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-400/25 to-blue-400/25 animate-float"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 animate-drift"></div>

        {/* Medium circles */}
        <div className="absolute top-1/2 right-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-blue-300/30 to-indigo-300/30 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400/25 to-blue-400/25 animate-float-reverse"></div>
        <div className="absolute top-1/3 left-1/2 w-28 h-28 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 animate-bounce-slow-reverse"></div>

        {/* Small fast circles */}
        <div className="absolute top-20 right-20 w-12 h-12 rounded-full bg-white/10 animate-ping-slow"></div>
        <div className="absolute bottom-20 left-20 w-8 h-8 rounded-full bg-blue-400/40 animate-pulse"></div>
        <div className="absolute top-40 left-1/4 w-6 h-6 rounded-full bg-purple-400/50 animate-bounce"></div>
        <div className="absolute bottom-40 right-1/3 w-10 h-10 rounded-full bg-indigo-400/35 animate-spin-slow"></div>

        {/* Floating particles */}
        <div className="absolute top-1/5 right-1/5 w-4 h-4 rounded-full bg-white/20 animate-float-up"></div>
        <div className="absolute bottom-1/5 left-1/5 w-3 h-3 rounded-full bg-blue-300/40 animate-float-up-delay"></div>
        <div className="absolute top-2/3 left-1/6 w-5 h-5 rounded-full bg-purple-300/30 animate-float-side"></div>
        <div className="absolute bottom-1/2 right-1/6 w-4 h-4 rounded-full bg-indigo-300/35 animate-float-side-reverse"></div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-transparent blur-3xl animate-rotate-slow"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-gradient-to-l from-purple-500/10 to-transparent blur-3xl animate-rotate-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-indigo-500/8 to-transparent blur-2xl animate-pulse-very-slow"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;