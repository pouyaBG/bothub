import React, { useState } from "react";
import {
  Clock,
  Globe,
  Monitor,
  FunnelSimple,
  ArrowClockwise,
} from "phosphor-react";
import Button from "../ui/button";
import Select from "../ui/select";
import Input from "../ui/input";
import type { UserActivity } from "../../types/user";

interface UserActivityLogProps {
  userId: number;
  activities: UserActivity[];
  loading?: boolean;
  onRefresh?: () => void;
}

const UserActivityLog: React.FC<UserActivityLogProps> = ({
  activities,
  loading = false,
  onRefresh,
}) => {
  const [filter, setFilter] = useState({
    action: "",
    dateRange: "",
    search: "",
  });

  const actionTypes = [
    { value: "", label: "همه اقدامات" },
    { value: "login", label: "ورود" },
    { value: "logout", label: "خروج" },
    { value: "update_profile", label: "به‌روزرسانی پروفایل" },
    { value: "create_bot", label: "ایجاد بات" },
    { value: "delete_bot", label: "حذف بات" },
    { value: "change_password", label: "تغییر رمز عبور" },
    { value: "api_call", label: "فراخوانی API" },
  ];

  const dateRanges = [
    { value: "", label: "همه زمان‌ها" },
    { value: "today", label: "امروز" },
    { value: "yesterday", label: "دیروز" },
    { value: "week", label: "هفته گذشته" },
    { value: "month", label: "ماه گذشته" },
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case "login":
        return "🔓";
      case "logout":
        return "🔒";
      case "update_profile":
        return "✏️";
      case "create_bot":
        return "🤖";
      case "delete_bot":
        return "🗑️";
      case "change_password":
        return "🔑";
      case "api_call":
        return "📡";
      default:
        return "📝";
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "login":
        return "text-green-400";
      case "logout":
        return "text-blue-400";
      case "delete_bot":
        return "text-red-400";
      case "change_password":
        return "text-amber-400";
      default:
        return "text-slate-400";
    }
  };

  const filteredActivities = activities.filter((activity) => {
    if (filter.action && activity.action !== filter.action) return false;
    if (
      filter.search &&
      !activity.description.toLowerCase().includes(filter.search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      {/* Header */}
      <div className="border-b border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-slate-400" />
            <h2 className="text-lg font-semibold text-white">
              تاریخچه فعالیت‌ها
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowClockwise size={16} />}
            onClick={onRefresh}
            loading={loading}
          >
            به‌روزرسانی
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-slate-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FunnelSimple size={16} className="text-slate-400" />
          <span className="text-slate-300 text-sm font-medium">فیلترها</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            value={filter.action}
            onChange={(value) => setFilter(prev => ({ ...prev, action: value }))}
            options={actionTypes}
            placeholder="نوع اقدام"
          />

          <Select
            value={filter.dateRange}
            onChange={(value) => setFilter(prev => ({ ...prev, dateRange: value }))}
            options={dateRanges}
            placeholder="بازه زمانی"
          />

          <Input
            placeholder="جستجو در توضیحات..."
            value={filter.search}
            onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>
      </div>

      {/* Activity List */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="mr-2 text-slate-400">در حال بارگذاری...</span>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            فعالیتی یافت نشد
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className="text-2xl">{getActionIcon(activity.action)}</div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-medium">
                      {activity.description}
                    </p>
                    <time
                      className="text-slate-400 text-sm"
                      dateTime={activity.timestamp}
                    >
                      {new Date(activity.timestamp).toLocaleDateString(
                        "fa-IR",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </time>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    {activity.ipAddress && (
                      <div className="flex items-center gap-1">
                        <Globe size={14} />
                        <span>{activity.ipAddress}</span>
                      </div>
                    )}

                    {activity.userAgent && (
                      <div className="flex items-center gap-1">
                        <Monitor size={14} />
                        <span className="truncate max-w-xs">
                          {activity.userAgent.split(" ")[0]}
                        </span>
                      </div>
                    )}

                    <span className={`font-medium ${getActionColor(activity.action)}`}>
                      {actionTypes.find(type => type.value === activity.action)?.label || activity.action}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredActivities.length > 0 && (
        <div className="border-t border-slate-700 p-6">
          <Button variant="ghost" size="md" fullWidth>
            بارگذاری فعالیت‌های بیشتر
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserActivityLog;