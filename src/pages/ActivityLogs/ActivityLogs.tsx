import {
  CheckCircle,
  ClockCounterClockwise,
  CreditCard,
  Gear,
  Info,
  Lock,
  MagnifyingGlass,
  Robot,
  Shield,
  User,
  UserCircle,
  Warning,
  X,
} from "phosphor-react";
import React, { useState } from "react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Dropdown from "../../components/ui/dropdown";
import LogCard from "../../components/logs/LogCard";

interface LogEntry {
  id: number;
  actor: {
    type: "admin" | "user" | "system";
    name: string;
    id?: string;
  };
  action: string;
  target: {
    type: "user" | "bot" | "plan" | "payment" | "channel" | "system";
    name: string;
    id?: string;
  };
  timestamp: string;
  details: {
    description: string;
    metadata?: any;
    before?: any;
    after?: any;
  };
  level: "info" | "warning" | "error" | "success";
  category: "auth" | "user" | "bot" | "payment" | "security" | "system";
  ip?: string;
}

const ActivityLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterActor, setFilterActor] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const logs: LogEntry[] = [
    {
      id: 1,
      actor: { type: "user", name: "احمد محمدی", id: "user_123" },
      action: "USER_LOGIN_SUCCESS",
      target: { type: "system", name: "سیستم داشبورد" },
      timestamp: "1403/12/15 14:30:25",
      details: {
        description: "ورود موفق به سیستم",
        metadata: { userAgent: "Chrome 120.0", location: "تهران" },
      },
      level: "info",
      category: "auth",
      ip: "192.168.1.100",
    },
    {
      id: 2,
      actor: { type: "admin", name: "مدیر سیستم", id: "admin_001" },
      action: "BOT_SETTINGS_UPDATED",
      target: { type: "bot", name: "ربات پشتیبانی", id: "bot_456" },
      timestamp: "1403/12/15 13:45:12",
      details: {
        description: "تغییر پیام خوش‌آمدگویی",
        before: { welcomeMessage: "سلام" },
        after: { welcomeMessage: "به ربات خوش آمدید" },
      },
      level: "info",
      category: "bot",
      ip: "192.168.1.101",
    },
    {
      id: 3,
      actor: { type: "admin", name: "فاطمه رضایی", id: "admin_002" },
      action: "USER_CREATED",
      target: { type: "user", name: "علی کریمی", id: "user_789" },
      timestamp: "1403/12/15 12:20:08",
      details: {
        description: "کاربر جدید با نقش مدیر اضافه شد",
        metadata: { role: "admin", permissions: ["read", "write", "delete"] },
      },
      level: "success",
      category: "user",
      ip: "192.168.1.102",
    },
    {
      id: 4,
      actor: { type: "admin", name: "مدیر سیستم", id: "admin_001" },
      action: "USER_ROLE_CHANGED",
      target: { type: "user", name: "علی کریمی", id: "user_789" },
      timestamp: "1403/12/15 11:15:33",
      details: {
        description: "دسترسی ادمین به کاربر داده شد",
        before: { role: "editor" },
        after: { role: "admin" },
      },
      level: "warning",
      category: "security",
      ip: "192.168.1.101",
    },
    {
      id: 5,
      actor: { type: "user", name: "سارا احمدی", id: "user_555" },
      action: "PAYMENT_FAILED",
      target: { type: "plan", name: "پلن طلایی", id: "plan_gold" },
      timestamp: "1403/12/15 10:30:45",
      details: {
        description: "پرداخت ناموفق برای خرید پلن",
        metadata: {
          amount: 50000,
          gateway: "زرین‌پال",
          errorCode: "INSUFFICIENT_FUNDS",
        },
      },
      level: "error",
      category: "payment",
      ip: "192.168.1.150",
    },
    {
      id: 6,
      actor: { type: "system", name: "سیستم خودکار" },
      action: "MAINTENANCE_MODE_ENABLED",
      target: { type: "system", name: "پنل مدیریت" },
      timestamp: "1403/12/15 02:00:00",
      details: {
        description: "حالت تعمیر فعال شد برای به‌روزرسانی",
        metadata: { duration: "30 minutes", reason: "security_update" },
      },
      level: "warning",
      category: "system",
    },
  ];


  const getActionText = (action: string) => {
    const actionMap: Record<string, string> = {
      USER_LOGIN_SUCCESS: "ورود موفق",
      USER_LOGIN_FAILURE: "ورود ناموفق",
      USER_LOGOUT: "خروج از سیستم",
      USER_CREATED: "ایجاد کاربر",
      USER_DELETED: "حذف کاربر",
      USER_ROLE_CHANGED: "تغییر نقش",
      PASSWORD_CHANGED: "تغییر رمز",
      BOT_CREATED: "ایجاد ربات",
      BOT_SETTINGS_UPDATED: "به‌روزرسانی ربات",
      BOT_DELETED: "حذف ربات",
      PAYMENT_SUCCESSFUL: "پرداخت موفق",
      PAYMENT_FAILED: "پرداخت ناموفق",
      PLAN_UPDATED: "به‌روزرسانی پلن",
      MAINTENANCE_MODE_ENABLED: "فعال‌سازی حالت تعمیر",
      API_KEY_UPDATED: "به‌روزرسانی کلید API",
    };
    return actionMap[action] || action;
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      getActionText(log.action).includes(searchTerm) ||
      log.actor.name.includes(searchTerm) ||
      log.target.name.includes(searchTerm) ||
      log.details.description.includes(searchTerm);

    const matchesCategory = filterType === "all" || log.category === filterType;
    const matchesLevel = filterLevel === "all" || log.level === filterLevel;
    const matchesActor =
      filterActor === "all" || log.actor.type === filterActor;

    return matchesSearch && matchesCategory && matchesLevel && matchesActor;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogs = filteredLogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="">
        <h1 className="text-2xl font-bold text-white">لاگ فعالیت‌ها</h1>
        <p className="text-gray-300 mt-1">
          مشاهده تمام فعالیت‌های انجام شده در سیستم
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="جستجو در لاگ‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<MagnifyingGlass size={20} />}
            inputSize="lg"
            className="text-black"
          />
          <Dropdown
            value={filterType}
            onChange={setFilterType}
            options={[
              { value: "all", label: "همه دسته‌ها" },
              {
                value: "auth",
                label: "احراز هویت",
                icon: <Lock size={16} className="text-blue-500" />,
              },
              {
                value: "user",
                label: "کاربران",
                icon: <UserCircle size={16} className="text-green-500" />,
              },
              {
                value: "bot",
                label: "ربات‌ها",
                icon: <Robot size={16} className="text-purple-500" />,
              },
              {
                value: "payment",
                label: "پرداخت",
                icon: <CreditCard size={16} className="text-yellow-500" />,
              },
              {
                value: "security",
                label: "امنیت",
                icon: <Shield size={16} className="text-red-500" />,
              },
              {
                value: "system",
                label: "سیستم",
                icon: <Gear size={16} className="text-gray-500" />,
              },
            ]}
          />

          <Dropdown
            value={filterLevel}
            onChange={setFilterLevel}
            options={[
              { value: "all", label: "همه سطوح" },
              {
                value: "info",
                label: "اطلاعات",
                icon: <Info size={16} className="text-blue-500" />,
              },
              {
                value: "success",
                label: "موفق",
                icon: <CheckCircle size={16} className="text-green-500" />,
              },
              {
                value: "warning",
                label: "اخطار",
                icon: <Warning size={16} className="text-yellow-500" />,
              },
              {
                value: "error",
                label: "خطا",
                icon: <X size={16} className="text-red-500" />,
              },
            ]}
          />

          <Dropdown
            value={filterActor}
            onChange={setFilterActor}
            options={[
              { value: "all", label: "همه" },
              {
                value: "admin",
                label: "ادمین",
                icon: <Shield size={16} className="text-purple-400" />,
              },
              {
                value: "user",
                label: "کاربر",
                icon: <User size={16} className="text-blue-400" />,
              },
              {
                value: "system",
                label: "سیستم",
                icon: <Gear size={16} className="text-gray-400" />,
              },
            ]}
          />
        </div>

        <div className="space-y-3">
          {paginatedLogs.map((log) => (
            <LogCard key={log.id} log={log} />
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <ClockCounterClockwise
              size={48}
              className="text-gray-400 mx-auto mb-4"
            />
            <p className="text-gray-500 text-lg">هیچ لاگی یافت نشد</p>
            <p className="text-gray-400 text-sm mt-2">
              فیلترهای خود را بررسی کنید یا جستجوی دیگری امتحان کنید
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-300">
                نمایش {startIndex + 1} تا{" "}
                {Math.min(startIndex + itemsPerPage, filteredLogs.length)} از{" "}
                {filteredLogs.length} نتیجه
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">تعداد در صفحه:</span>
                <Dropdown
                  value={itemsPerPage.toString()}
                  onChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                  options={[
                    { value: "5", label: "5" },
                    { value: "10", label: "10" },
                    { value: "25", label: "25" },
                    { value: "50", label: "50" },
                  ]}
                  className="w-20"
                />
              </div>
            </div>

            <nav className="flex space-x-1 space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}>
                قبلی
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = index + 1;
                } else if (currentPage <= 3) {
                  pageNumber = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + index;
                } else {
                  pageNumber = currentPage - 2 + index;
                }

                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}>
                    {pageNumber}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}>
                بعدی
              </Button>
            </nav>
          </div>
        )}
        <div className="mt-4 text-center text-sm text-gray-500">
          کل لاگ‌ها: {logs.length} | فیلتر شده: {filteredLogs.length}
        </div>
      </div>
    </>
  );
};

export default ActivityLogs;
