import { ArrowLeft, House, MagnifyingGlass } from "phosphor-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text animate-pulse">
            404
          </div>

          {/* Floating dots animation */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-0"></div>
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-300"></div>
            <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-450"></div>
          </div>
        </div>

        {/* Error message with slide-in animation */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            صفحه پیدا نشد!
          </h1>
          <p className="text-lg text-gray-400 mb-2 animate-fade-in delay-200">
            متأسفانه صفحه‌ای که دنبال آن می‌گردید وجود ندارد.
          </p>
          <p className="text-gray-500 animate-fade-in delay-300">
            ممکن است آدرس اشتباه وارد کرده باشید یا صفحه منتقل شده باشد.
          </p>
        </div>

        {/* Search suggestion with glow effect */}
        <div className="mb-8 animate-fade-in delay-400">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient-x"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-spin-slow">
                  <MagnifyingGlass size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">چی دنبالش می‌گردی؟</h3>
              <p className="text-gray-400 text-sm">
                از منوی کناری می‌تونی به بخش‌های مختلف دسترسی پیدا کنی
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons with hover animations */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
          <Button
            variant="primary"
            size="lg"
            icon={<House size={20} />}
            onClick={() => navigate("/")}
            className="transform hover:scale-105 transition-transform duration-200 hover:shadow-xl hover:shadow-blue-500/25">
            بازگشت به خانه
          </Button>

          <Button
            variant="outline"
            size="lg"
            icon={<ArrowLeft size={20} />}
            onClick={() => navigate(-1)}
            className="transform hover:scale-105 transition-transform duration-200 hover:shadow-xl hover:shadow-gray-500/25">
            بازگشت به صفحه قبل
          </Button>
        </div>

        {/* Floating animation elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-float-slow"></div>
      </div>

      {/* Custom styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes gradient-x {
            0%, 100% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(100%);
            }
          }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(120deg); }
            66% { transform: translateY(10px) rotate(240deg); }
          }

          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(15px) rotate(-120deg); }
            66% { transform: translateY(-15px) rotate(-240deg); }
          }

          @keyframes float-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          .animate-slide-up {
            animation: slide-up 0.6s ease-out;
          }

          .animate-fade-in {
            animation: fade-in 0.8s ease-out;
          }

          .delay-200 {
            animation-delay: 0.2s;
            opacity: 0;
            animation-fill-mode: forwards;
          }

          .delay-300 {
            animation-delay: 0.3s;
            opacity: 0;
            animation-fill-mode: forwards;
          }

          .delay-400 {
            animation-delay: 0.4s;
            opacity: 0;
            animation-fill-mode: forwards;
          }

          .delay-500 {
            animation-delay: 0.5s;
            opacity: 0;
            animation-fill-mode: forwards;
          }

          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
          }

          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }

          .animate-float-slow {
            animation: float-slow 4s ease-in-out infinite;
          }
        `
      }} />
    </div>
  );
};

export default NotFound;