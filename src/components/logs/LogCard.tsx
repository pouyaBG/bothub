import React from "react";
import {
  CheckCircle,
  ClockCounterClockwise,
  CreditCard,
  Gear,
  Info,
  Lock,
  Robot,
  Shield,
  User,
  UserCircle,
  Warning,
  X,
} from "phosphor-react";

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

interface LogCardProps {
  log: LogEntry;
}

const LogCard: React.FC<LogCardProps> = ({ log }) => {
  const getActorIcon = (actorType: string) => {
    switch (actorType) {
      case "admin":
        return <Shield size={16} className="text-purple-400" />;
      case "user":
        return <User size={16} className="text-blue-400" />;
      case "system":
        return <Gear size={16} className="text-gray-400" />;
      default:
        return <UserCircle size={16} className="text-gray-400" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "auth":
        return <Lock size={20} className="text-blue-500" />;
      case "bot":
        return <Robot size={20} className="text-purple-500" />;
      case "user":
        return <UserCircle size={20} className="text-green-500" />;
      case "payment":
        return <CreditCard size={20} className="text-yellow-500" />;
      case "security":
        return <Shield size={20} className="text-red-500" />;
      case "system":
        return <Gear size={20} className="text-gray-500" />;
      default:
        return <ClockCounterClockwise size={20} className="text-gray-500" />;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return <Info size={16} className="text-blue-500" />;
      case "success":
        return <CheckCircle size={16} className="text-green-500" />;
      case "warning":
        return <Warning size={16} className="text-yellow-500" />;
      case "error":
        return <X size={16} className="text-red-500" />;
      default:
        return <Info size={16} className="text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "auth":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "bot":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "user":
        return "bg-green-100 text-green-800 border-green-200";
      case "payment":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "security":
        return "bg-red-100 text-red-800 border-red-200";
      case "system":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "success":
        return "bg-green-50 text-green-700 border-green-200";
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "error":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

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

  const getCategoryText = (category: string) => {
    const categoryMap: Record<string, string> = {
      auth: "احراز هویت",
      user: "کاربران",
      bot: "ربات‌ها",
      payment: "پرداخت",
      security: "امنیت",
      system: "سیستم",
    };
    return categoryMap[category] || category;
  };

  const getLevelText = (level: string) => {
    const levelMap: Record<string, string> = {
      info: "اطلاعات",
      success: "موفق",
      warning: "اخطار",
      error: "خطا",
    };
    return levelMap[level] || level;
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="flex items-center gap-3">
            {getCategoryIcon(log.category)}
            <h3 className="font-semibold text-white mb-1">
              {getActionText(log.action)}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(
                  log.category
                )}`}>
                {getCategoryText(log.category)}
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getLevelColor(
                  log.level
                )}`}>
                {getLevelIcon(log.level)}
                {getLevelText(log.level)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-left flex-shrink-0">
          <span className="text-sm text-gray-500 block">{log.timestamp}</span>
          {log.ip && (
            <span className="text-xs text-gray-400 font-mono">{log.ip}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm mb-3">
        <div className="flex items-center gap-2">
          <span className="text-gray-300">انجام‌دهنده:</span>
          <div className="flex items-center gap-1">
            {getActorIcon(log.actor.type)}
            <span className="font-medium text-white">{log.actor.name}</span>
            {log.actor.id && (
              <span className="text-xs text-gray-500">({log.actor.id})</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-300">هدف:</span>
          <span className="font-medium text-white">{log.target.name}</span>
          {log.target.id && (
            <span className="text-xs text-gray-500">({log.target.id})</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-300">جزئیات:</span>
          <span className="text-white truncate">{log.details.description}</span>
        </div>
      </div>

      {(log.details.before || log.details.after || log.details.metadata) && (
        <div className="">
          {(log.details.before || log.details.after) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="text-xs font-medium text-yellow-800 mb-2">
                تغییرات:
              </div>
              {log.details.before && (
                <div className="mb-1">
                  <span className="text-red-600 font-medium text-xs">
                    قبل:{" "}
                  </span>
                  <span className="text-gray-700 text-xs">
                    {JSON.stringify(log.details.before)}
                  </span>
                </div>
              )}
              {log.details.after && (
                <div>
                  <span className="text-green-600 font-medium text-xs">
                    بعد:{" "}
                  </span>
                  <span className="text-gray-700 text-xs">
                    {JSON.stringify(log.details.after)}
                  </span>
                </div>
              )}
            </div>
          )}

          {log.details.metadata && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-xs font-medium text-blue-800 mb-2">
                اطلاعات اضافی:
              </div>
              <div className="text-xs text-gray-700">
                {Object.entries(log.details.metadata).map(([key, value]) => (
                  <div key={key} className="mb-1">
                    <span className="font-medium">{key}: </span>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogCard;
