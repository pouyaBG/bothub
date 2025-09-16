import React, { useState } from "react";
import { Bell, CheckCircle, XCircle, Info, Warning, Trash } from "phosphor-react";
import Button from "../../components/ui/button";

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      title: "سیستم به‌روزرسانی شد",
      message: "نسخه جدید سیستم با موفقیت نصب شد",
      type: "success",
      time: "5 دقیقه پیش",
      read: false,
    },
    {
      id: 2,
      title: "تراکنش ناموفق",
      message: "تراکنش شماره #1234 به دلیل عدم موجودی کافی انجام نشد",
      type: "error",
      time: "15 دقیقه پیش",
      read: false,
    },
    {
      id: 3,
      title: "کاربر جدید ثبت‌نام کرد",
      message: "کاربر جدید با ایمیل user@example.com ثبت‌نام کرده است",
      type: "info",
      time: "30 دقیقه پیش",
      read: true,
    },
    {
      id: 4,
      title: "هشدار امنیتی",
      message: "تلاش ورود مشکوک از IP آدرس 192.168.1.50 شناسایی شد",
      type: "warning",
      time: "1 ساعت پیش",
      read: false,
    },
    {
      id: 5,
      title: "پشتیبان‌گیری تکمیل شد",
      message: "پشتیبان‌گیری روزانه با موفقیت انجام شد",
      type: "success",
      time: "2 ساعت پیش",
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} className="text-green-500" />;
      case "error":
        return <XCircle size={20} className="text-red-500" />;
      case "warning":
        return <Warning size={20} className="text-yellow-500" />;
      case "info":
        return <Info size={20} className="text-blue-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getNotificationBorder = (type: string) => {
    switch (type) {
      case "success":
        return "border-r-green-500";
      case "error":
        return "border-r-red-500";
      case "warning":
        return "border-r-yellow-500";
      case "info":
        return "border-r-blue-500";
      default:
        return "border-r-gray-500";
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.read;
    if (filter === "read") return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <h1 className="text-2xl font-bold text-gray-900">اعلان‌ها</h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-1">مدیریت اعلان‌ها و پیام‌های سیستم</p>
          </div>
          <div className="flex space-x-2 space-x-reverse">
            <Button variant="secondary" size="md">
              علامت‌گذاری همه به‌عنوان خوانده‌شده
            </Button>
            <Button variant="danger" size="md" icon={<Trash size={16} />}>
              پاک کردن همه
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex space-x-4 space-x-reverse mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}>
            همه ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "unread"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}>
            خوانده‌نشده ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "read"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}>
            خوانده‌شده ({notifications.length - unreadCount})
          </button>
        </div>

        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`border border-gray-200 rounded-lg p-4 border-r-4 ${getNotificationBorder(notification.type)} ${
                !notification.read ? "bg-blue-50/30" : "bg-white"
              } hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 space-x-reverse">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 space-x-reverse mb-1">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{notification.message}</p>
                    <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                  </div>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  {!notification.read && (
                    <Button variant="ghost" size="sm">
                      علامت‌گذاری به‌عنوان خوانده‌شده
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" icon={<Trash size={16} />} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {filter === "all" ? "هیچ اعلانی وجود ندارد" :
               filter === "unread" ? "همه اعلان‌ها خوانده شده‌اند" :
               "هیچ اعلان خوانده‌شده‌ای وجود ندارد"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;