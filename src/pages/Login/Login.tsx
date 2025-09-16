import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeSlash, Robot, Envelope, Lock } from 'phosphor-react';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication check
    setTimeout(() => {
      if (formData.email === 'admin@admin.com' && formData.password === '123456') {
        console.log('ورود موفقیت‌آمیز');
        navigate('/');
      } else {
        alert('نام کاربری یا رمز عبور اشتباه است!\n\nنام کاربری: admin@admin.com\nرمز عبور: 123456');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <Robot size={40} className="text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">
            ورود به داشبورد بات‌ها
          </h2>
          <p className="mt-2 text-blue-100">
            برای دسترسی به پنل مدیریت وارد شوید
          </p>
          <div className="mt-4 p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <p className="text-xs text-blue-200 text-center">
              <strong>حساب آزمایشی:</strong><br/>
              ایمیل: admin@admin.com<br/>
              رمز عبور: 123456
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  ایمیل
                </label>
                <div className="relative">
                  <Envelope size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-lg w-full pr-10 py-3 px-4 bg-white/20 border border-white/30 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  رمز عبور
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
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
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/30 bg-white/20 rounded"
                />
                <label htmlFor="remember-me" className="mr-2 block text-sm text-white">
                  مرا به خاطر بسپار
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-white hover:text-blue-200 transition-colors">
                  رمز عبور را فراموش کردید؟
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 ml-2"></div>
                  در حال ورود...
                </div>
              ) : (
                'ورود به داشبورد'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-white/80">
                حساب کاربری ندارید؟{' '}
                <a href="#" className="font-medium text-white hover:text-blue-200 transition-colors">
                  ثبت نام کنید
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
