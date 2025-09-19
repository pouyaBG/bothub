import {
  ArrowsDownUp,
  Eye,
  FunnelSimple,
  MagnifyingGlass,
  Plus,
  Power,
  Trash
} from "phosphor-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/badge";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select";
import type { User, UserRole, UserStatus } from "../../types/user";

const UsersList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, _setSortBy] = useState("joinDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const navigate = useNavigate();

  const users: User[] = [
    {
      id: 1,
      name: "احمد محمدی",
      email: "ahmad@example.com",
      username: "ahmad_m",
      role: {
        id: 1,
        name: "admin",
        displayName: "ادمین کل",
        level: 3,
        color: "red",
        permissions: []
      },
      status: "active",
      planType: "enterprise",
      joinDate: "2024-01-15",
      lastLogin: "2024-09-19T10:30:00",
      isOnline: true,
      permissions: []
    },
    {
      id: 2,
      name: "فاطمه رضایی",
      email: "fateme@example.com",
      username: "fateme_r",
      role: {
        id: 2,
        name: "user",
        displayName: "کاربر عادی",
        level: 1,
        color: "blue",
        permissions: []
      },
      status: "active",
      planType: "basic",
      joinDate: "2024-02-20",
      lastLogin: "2024-09-18T15:45:00",
      isOnline: false,
      permissions: []
    },
    {
      id: 3,
      name: "علی کریمی",
      email: "ali@example.com",
      username: "ali_k",
      role: {
        id: 3,
        name: "editor",
        displayName: "ویرایشگر",
        level: 2,
        color: "green",
        permissions: []
      },
      status: "inactive",
      planType: "premium",
      joinDate: "2024-01-10",
      lastLogin: "2024-09-10T08:20:00",
      isOnline: false,
      permissions: []
    },
    {
      id: 4,
      name: "زهرا احمدی",
      email: "zahra@example.com",
      username: "zahra_a",
      role: {
        id: 2,
        name: "user",
        displayName: "کاربر عادی",
        level: 1,
        color: "blue",
        permissions: []
      },
      status: "active",
      planType: "free",
      joinDate: "2024-03-05",
      lastLogin: "2024-09-19T09:15:00",
      isOnline: true,
      permissions: []
    },
    {
      id: 5,
      name: "محمد نوری",
      email: "mohammad@example.com",
      username: "mohammad_n",
      role: {
        id: 2,
        name: "user",
        displayName: "کاربر عادی",
        level: 1,
        color: "blue",
        permissions: []
      },
      status: "suspended",
      planType: "basic",
      joinDate: "2024-02-28",
      lastLogin: "2024-09-05T14:30:00",
      isOnline: false,
      permissions: []
    },
  ];

  const roleOptions = [
    { value: "", label: "همه نقش‌ها" },
    { value: "admin", label: "ادمین کل" },
    { value: "editor", label: "ویرایشگر" },
    { value: "user", label: "کاربر عادی" },
  ];

  const statusOptions = [
    { value: "", label: "همه وضعیت‌ها" },
    { value: "active", label: "فعال" },
    { value: "inactive", label: "غیرفعال" },
    { value: "suspended", label: "مسدود شده" },
    { value: "pending", label: "در انتظار تایید" },
  ];

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "active":
        return <Badge variant="success" size="sm">فعال</Badge>;
      case "inactive":
        return <Badge variant="default" size="sm">غیرفعال</Badge>;
      case "suspended":
        return <Badge variant="danger" size="sm">مسدود</Badge>;
      case "pending":
        return <Badge variant="warning" size="sm">در انتظار</Badge>;
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: UserRole) => {
    const colorMap: Record<string, "primary" | "success" | "danger" | "warning" | "info"> = {
      red: "danger",
      green: "success",
      blue: "primary",
      yellow: "warning",
      cyan: "info",
    };
    return (
      <Badge variant={colorMap[role.color] || "default"} size="sm">
        {role.displayName}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || user.role.name === selectedRole;
    const matchesStatus = !selectedStatus || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case "name":
        aValue = a.name;
        bValue = b.name;
        break;
      case "joinDate":
        aValue = new Date(a.joinDate).getTime();
        bValue = new Date(b.joinDate).getTime();
        break;
      case "lastLogin":
        aValue = a.lastLogin ? new Date(a.lastLogin).getTime() : 0;
        bValue = b.lastLogin ? new Date(b.lastLogin).getTime() : 0;
        break;
      default:
        aValue = a.id;
        bValue = b.id;
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === sortedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(sortedUsers.map(user => user.id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return "هرگز";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "کمتر از یک ساعت پیش";
    if (diffInHours < 24) return `${diffInHours} ساعت پیش`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)} روز پیش`;
    return date.toLocaleDateString('fa-IR');
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">لیست کاربران</h1>
            <p className="text-gray-300 mt-1">
              مدیریت کاربران و دسترسی‌ها ({filteredUsers.length} کاربر)
            </p>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <Button
              variant="outline"
              size="lg"
              icon={<FunnelSimple size={20} />}
              onClick={() => setShowBulkActions(!showBulkActions)}>
              فیلترها
            </Button>
            <Button
              variant="primary"
              size="lg"
              icon={<Plus size={20} />}
              onClick={() => navigate("/user-management/add")}>
              افزودن کاربر جدید
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters Card */}
      <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex-1">
              <Input
                placeholder="جستجو بر اساس نام، ایمیل یا نام کاربری..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<MagnifyingGlass size={20} />}
                inputSize="lg"
              />
            </div>
            <div className="w-48">
              <Select
                value={selectedRole}
                onChange={setSelectedRole}
                options={roleOptions}
                placeholder="فیلتر نقش"
              />
            </div>
            <div className="w-48">
              <Select
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={statusOptions}
                placeholder="فیلتر وضعیت"
              />
            </div>
            <Button
              variant="ghost"
              size="lg"
              icon={<ArrowsDownUp size={20} />}
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              مرتب‌سازی
            </Button>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="bg-blue-900/50 border border-blue-600 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="text-blue-300">
                  {selectedUsers.length} کاربر انتخاب شده
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button variant="outline" size="sm">
                    تغییر نقش گروهی
                  </Button>
                  <Button variant="outline" size="sm">
                    غیرفعال‌سازی گروهی
                  </Button>
                  <Button variant="danger" size="sm">
                    حذف گروهی
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-right py-3 px-4 font-semibold text-gray-300 w-12">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === sortedUsers.length && sortedUsers.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:outline-none"
                  />
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-300">
                  کاربر
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-300">
                  شناسه
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-300">
                  نقش
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-300">
                  وضعیت
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-300">
                  تاریخ عضویت
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-300">
                  آخرین ورود
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-300">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:outline-none"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        {user.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-500">
                          @{user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-400 font-mono text-sm">
                    #{user.id}
                  </td>
                  <td className="py-4 px-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">
                    {formatDate(user.joinDate)}
                  </td>
                  <td className="py-4 px-4 text-gray-400 text-sm">
                    {formatLastLogin(user.lastLogin)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye size={16} />}
                        onClick={() => navigate(`/user-management/profile/${user.id}`)}
                        title="مشاهده و ویرایش پروفایل"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Power size={16} />}
                        title="تغییر وضعیت"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash size={16} />}
                        title="حذف"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">هیچ کاربری یافت نشد</div>
            <p className="text-gray-500 mt-2">
              فیلترها را تغییر دهید یا کلمه کلیدی جدیدی جستجو کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
