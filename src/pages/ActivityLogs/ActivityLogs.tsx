import React, { useState } from "react";
import { ClockCounterClockwise, User, Robot, Shield, MagnifyingGlass } from "phosphor-react";
import Input from "../../components/ui/input";

const ActivityLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const logs = [
    {
      id: 1,
      action: "ورود کاربر",
      user: "احمد محمدی",
      details: "ورود موفق به سیستم",
      type: "auth",
      timestamp: "1403/12/15 14:30",
      ip: "192.168.1.100",
    },
    {
      id: 2,
      action: "تغییر تنظیمات ربات",
      user: "مدیر سیستم",
      details: "تغییر پیام خوش‌آمدگویی",
      type: "bot",
      timestamp: "1403/12/15 13:45",
      ip: "192.168.1.101",
    },
    {
      id: 3,
      action: "افزودن کاربر جدید",
      user: "فاطمه رضایی",
      details: "کاربر جدید با نقش مدیر اضافه شد",
      type: "user",
      timestamp: "1403/12/15 12:20",
      ip: "192.168.1.102",
    },
    {
      id: 4,
      action: "تغییر دسترسی",
      user: "مدیر سیستم",
      details: "دسترسی ادمین به علی کریمی داده شد",
      type: "security",
      timestamp: "1403/12/15 11:15",
      ip: "192.168.1.101",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "auth":
        return <User size={16} className="text-blue-500" />;
      case "bot":
        return <Robot size={16} className="text-purple-500" />;
      case "user":
        return <User size={16} className="text-green-500" />;
      case "security":
        return <Shield size={16} className="text-red-500" />;
      default:
        return <ClockCounterClockwise size={16} className="text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "auth":
        return "bg-blue-100 text-blue-800";
      case "bot":
        return "bg-purple-100 text-purple-800";
      case "user":
        return "bg-green-100 text-green-800";
      case "security":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.includes(searchTerm) ||
                         log.user.includes(searchTerm) ||
                         log.details.includes(searchTerm);
    const matchesType = filterType === "all" || log.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">لاگ فعالیت‌ها</h1>
        <p className="text-gray-600 mt-1">مشاهده تمام فعالیت‌های انجام شده در سیستم</p>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="جستجو در لاگ‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<MagnifyingGlass size={20} />}
              inputSize="lg"
            />
          </div>
          <div className="md:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">همه فعالیت‌ها</option>
              <option value="auth">احراز هویت</option>
              <option value="bot">تنظیمات ربات</option>
              <option value="user">مدیریت کاربران</option>
              <option value="security">امنیت</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div key={log.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  {getTypeIcon(log.type)}
                  <h3 className="font-semibold text-gray-900">{log.action}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(log.type)}`}>
                    {log.type === "auth" ? "احراز هویت" :
                     log.type === "bot" ? "ربات" :
                     log.type === "user" ? "کاربر" :
                     log.type === "security" ? "امنیت" : "عمومی"}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{log.timestamp}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">کاربر: </span>
                  <span className="font-medium text-gray-900">{log.user}</span>
                </div>
                <div>
                  <span className="text-gray-600">IP: </span>
                  <span className="font-mono text-gray-700">{log.ip}</span>
                </div>
                <div className="md:col-span-1">
                  <span className="text-gray-600">جزئیات: </span>
                  <span className="text-gray-900">{log.details}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <ClockCounterClockwise size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">هیچ لاگی یافت نشد</p>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <nav className="flex space-x-1 space-x-reverse">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              قبلی
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg">
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              بعدی
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;