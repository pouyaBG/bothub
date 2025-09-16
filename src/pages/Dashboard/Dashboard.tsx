import {
  Bell,
  ChartBar,
  Clock,
  CreditCard,
  Eye,
  House,
  Robot,
  TrendUp,
  Users,
} from "phosphor-react";
import React from "react";
import Button from "../../components/ui/button";

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "کل کاربران",
      value: "1,234",
      change: "+12%",
      changeText: "نسبت به ماه گذشته",
      icon: Users,
      color: "blue",
      trend: "up",
    },
    {
      title: "بات‌های فعال",
      value: "8",
      change: "+2",
      changeText: "بات جدید",
      icon: Robot,
      color: "green",
      trend: "up",
    },
    {
      title: "پیام‌های امروز",
      value: "2,847",
      change: "24h",
      changeText: "در 24 ساعت گذشته",
      icon: Bell,
      color: "purple",
      trend: "neutral",
    },
    {
      title: "درآمد ماهانه",
      value: "12,450,000",
      change: "+8.2%",
      changeText: "رشد",
      icon: CreditCard,
      color: "yellow",
      trend: "up",
    },
  ];

  const quickActions = [
    {
      title: "مدیریت کاربران",
      description: "افزودن و مدیریت کاربران",
      icon: Users,
      path: "/user-management",
    },
    {
      title: "ارسال پیام",
      description: "ارسال پیام به کاربران",
      icon: Bell,
      path: "/messaging",
    },
    {
      title: "گزارشات",
      description: "مشاهده آمار و گزارشات",
      icon: ChartBar,
      path: "/reports",
    },
    {
      title: "تنظیمات ربات",
      description: "پیکربندی ربات‌ها",
      icon: Robot,
      path: "/bot-settings",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      text: "کاربر جدید ثبت‌نام کرد",
      time: "5 دقیقه پیش",
      type: "user",
      color: "green",
    },
    {
      id: 2,
      text: "ربات پشتیبانی به‌روزرسانی شد",
      time: "15 دقیقه پیش",
      type: "bot",
      color: "blue",
    },
    {
      id: 3,
      text: "تراکنش جدید انجام شد",
      time: "30 دقیقه پیش",
      type: "payment",
      color: "yellow",
    },
    {
      id: 4,
      text: "پیام جمعی ارسال شد",
      time: "1 ساعت پیش",
      type: "message",
      color: "purple",
    },
    {
      id: 5,
      text: "کاربر از سیستم خارج شد",
      time: "2 ساعت پیش",
      type: "auth",
      color: "red",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      yellow: "bg-yellow-100 text-yellow-600",
      red: "bg-red-100 text-red-600",
    };
    return colors[color as keyof typeof colors] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">خوش آمدید به داشبورد</h1>
            <p className="text-blue-100">مدیریت جامع بات‌ها و کاربران شما</p>
          </div>
          <House size={48} className="text-blue-200" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <div
                  className={`text-sm flex items-center mt-2 ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : stat.trend === "down"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}>
                  {stat.trend === "up" && (
                    <TrendUp size={16} className="ml-1" />
                  )}
                  {stat.trend === "neutral" && (
                    <Clock size={16} className="ml-1" />
                  )}
                  <span>
                    {stat.change} {stat.changeText}
                  </span>
                </div>
              </div>
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${getColorClasses(
                  stat.color
                )}`}>
                <stat.icon size={28} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">عملیات سریع</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-center gap-2  mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <action.icon size={20} className="text-blue-600" />
                </div>

                <h3 className="font-semibold text-gray-900">{action.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{action.description}</p>
              <Button variant="ghost" size="sm" fullWidth>
                مشاهده
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                فعالیت‌های اخیر
              </h2>
              <Button variant="ghost" size="sm" icon={<Eye size={16} />}>
                مشاهده همه
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 space-x-reverse">
                  <div
                    className={`w-3 h-3 rounded-full bg-${activity.color}-500`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.text}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">وضعیت سیستم</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">سرور اصلی</span>
                </div>
                <span className="text-sm text-green-600">فعال</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">پایگاه داده</span>
                </div>
                <span className="text-sm text-green-600">فعال</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">API سرویس</span>
                </div>
                <span className="text-sm text-green-600">فعال</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">
                    پشتیبان‌گیری
                  </span>
                </div>
                <span className="text-sm text-yellow-600">در حال انجام</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
