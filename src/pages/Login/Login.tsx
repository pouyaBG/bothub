import { Eye, EyeSlash, Lock, User } from "phosphor-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import AnimatedBackground from "../../components/common/AnimatedBackground";
import { useAuth } from "../../context/AuthContext";

interface LoginFormData {
  username: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        // Small delay to ensure auth state is updated before navigation
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 100);
      } else {
        setError("نام کاربری یا رمز عبور اشتباه است!");
      }
    } catch (error) {
      setError("خطا در ورود. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      dir="rtl">
      <AnimatedBackground />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center p-2">
            <img
              src={logo}
              alt="لوگو"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white mb-2">
                  نام کاربری
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    className="appearance-none rounded-lg w-full pr-10 py-3 px-4 bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    placeholder="نام کاربری خود را وارد کنید"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-2">
                  رمز عبور
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-lg w-full pr-10 pl-10 py-3 px-4 bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    placeholder="رمز عبور خود را وارد کنید"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/30 bg-white/20 rounded"
              />
              <label
                htmlFor="remember-me"
                className="mr-2 block text-sm text-white">
                مرا به خاطر بسپار
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 ml-2"></div>
                  در حال ورود...
                </div>
              ) : (
                "ورود به داشبورد"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
