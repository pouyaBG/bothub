import React from "react";
import { FunnelSimple, X } from "phosphor-react";
import Input from "../ui/input";
import Select from "../ui/select";
import Button from "../ui/button";
import type { UserFilters, UserStatus, PlanType } from "../../types/user";

interface UserListFiltersProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
}

const UserListFilters: React.FC<UserListFiltersProps> = ({
  filters,
  onFiltersChange,
  searchTerm,
  onSearchChange,
  onClearFilters,
}) => {
  const roleOptions = [
    { value: "", label: "همه نقش‌ها" },
    { value: "admin", label: "ادمین کل" },
    { value: "manager", label: "مدیر" },
    { value: "editor", label: "ویرایشگر" },
    { value: "user", label: "کاربر عادی" },
  ];

  const statusOptions = [
    { value: "", label: "همه وضعیت‌ها" },
    { value: "active", label: "فعال" },
    { value: "inactive", label: "غیرفعال" },
    { value: "suspended", label: "معلق" },
    { value: "pending", label: "در انتظار تایید" },
  ];

  const planOptions = [
    { value: "", label: "همه پلن‌ها" },
    { value: "free", label: "رایگان" },
    { value: "basic", label: "پایه" },
    { value: "premium", label: "پریمیوم" },
    { value: "enterprise", label: "سازمانی" },
  ];

  const hasActiveFilters =
    filters.role ||
    filters.status ||
    filters.planType ||
    searchTerm;

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FunnelSimple size={20} className="text-slate-400" />
        <h3 className="text-lg font-semibold text-white">فیلتر و جستجو</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            icon={<X size={16} />}
            onClick={onClearFilters}
            className="mr-auto"
          >
            پاک کردن فیلترها
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Input
            placeholder="جستجو در نام، ایمیل یا نام کاربری..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
          />
        </div>

        <div>
          <Select
            value={filters.role || ""}
            onChange={(value) =>
              onFiltersChange({ ...filters, role: value || undefined })
            }
            options={roleOptions}
            placeholder="نقش کاربری"
          />
        </div>

        <div>
          <Select
            value={filters.status || ""}
            onChange={(value) =>
              onFiltersChange({
                ...filters,
                status: (value as UserStatus) || undefined
              })
            }
            options={statusOptions}
            placeholder="وضعیت"
          />
        </div>

        <div>
          <Select
            value={filters.planType || ""}
            onChange={(value) =>
              onFiltersChange({
                ...filters,
                planType: (value as PlanType) || undefined
              })
            }
            options={planOptions}
            placeholder="نوع پلن"
          />
        </div>
      </div>
    </div>
  );
};

export default UserListFilters;