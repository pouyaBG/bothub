import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CaretLeft } from "phosphor-react";

interface BreadcrumbItem {
  title: string;
  path: string;
}

const routeConfig: Record<string, string> = {
  "/": "داشبورد",
  "/bots": "مدیریت بات‌ها",
  "/bots/list": "لیست بات‌ها",
  "/bots/add": "افزودن بات جدید",
  "/user-management": "مدیریت کاربران",
  "/user-management/list": "لیست کاربران",
  "/user-management/profile": "پروفایل کاربر",
  "/user-management/details": "جزئیات کاربر",
  "/messaging": "پیام‌رسانی",
  "/messaging/new": "ارسال پیام جدید",
  "/messaging/history": "تاریخچه پیام‌ها",
  "/payments": "پرداخت‌ها",
  "/payments/transactions": "تراکنش‌ها",
  "/payments/settings": "تنظیمات پرداخت",
  "/bot-settings": "تنظیمات بات",
  "/bot-settings/general": "تنظیمات عمومی",
  "/bot-settings/security": "امنیت",
  "/plugins": "پلاگین‌ها",
  "/plugins/list": "لیست پلاگین‌ها",
  "/plugins/add": "افزودن پلاگین",
  "/channels": "کانال‌ها",
  "/channels/list": "لیست کانال‌ها",
  "/channels/add": "افزودن کانال/گروه جدید",
  "/channels/mandatory-join": "جوین اجباری",
  "/activity-logs": "لاگ‌های فعالیت",
  "/notifications": "اعلانات",
  "/profile": "پروفایل",
  "/reports": "گزارشات",
  "/users": "کاربران",
  "/users/list": "لیست کاربران",
  "/users/add": "افزودن کاربر",
  "/settings": "تنظیمات",
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems: BreadcrumbItem[] = [{ title: "داشبورد", path: "/" }];

  let currentPath = "";
  pathnames.forEach((segment) => {
    currentPath += `/${segment}`;
    let title = routeConfig[currentPath];

    // Handle dynamic routes like /bots/:id
    if (!title && currentPath.startsWith("/bots/") && currentPath !== "/bots/list" && currentPath !== "/bots/add") {
      const botId = segment;
      title = `مدیریت ربات #${botId}`;
    }

    // Handle dynamic routes like /user-management/profile/:id
    if (!title && currentPath.startsWith("/user-management/profile/")) {
      const userId = segment;
      title = `پروفایل کاربر #${userId}`;
    }

    // Handle dynamic routes like /user-management/details/:id
    if (!title && currentPath.startsWith("/user-management/details/")) {
      const userId = segment;
      title = `جزئیات کاربر #${userId}`;
    }

    if (title) {
      breadcrumbItems.push({ title, path: currentPath });
    }
  });

  return (
    <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-400">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path}>
          {index === breadcrumbItems.length - 1 ? (
            <span className="text-white font-semibold">{item.title}</span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-blue-400 transition-colors font-medium">
              {item.title}
            </Link>
          )}
          {index < breadcrumbItems.length - 1 && (
            <CaretLeft size={14} className="text-gray-500 mx-1" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
