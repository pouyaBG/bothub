import {
  ArrowLeft,
  PencilSimple,
  Shield,
  User as UserIcon,
  Activity,
  Check,
  X
} from "phosphor-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/button";
import Badge from "../../components/ui/badge";
import Select from "../../components/ui/select";
import Input from "../../components/ui/input";
import type { User, UserActivity } from "../../types/user";

interface EditableFieldProps {
  label: string;
  value: string;
  fieldName: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onChange,
  type = "text",
  placeholder
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <div className="flex-1">
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                type={type}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={<Check size={14} />}
              onClick={onSave}
              className="text-green-400 hover:text-green-300"
              title="ذخیره"
            />
            <Button
              variant="ghost"
              size="sm"
              icon={<X size={14} />}
              onClick={onCancel}
              className="text-red-400 hover:text-red-300"
              title="لغو"
            />
          </>
        ) : (
          <>
            <div className="flex-1">
              <p className="text-white font-medium py-2.5">{value || "تعین نشده"}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={<PencilSimple size={14} />}
              onClick={onEdit}
              className="text-gray-400 hover:text-white"
              title="ویرایش"
            />
          </>
        )}
      </div>
    </div>
  );
};

interface EditableSelectProps {
  label: string;
  value: string;
  displayValue: React.ReactNode;
  fieldName: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

const EditableSelect: React.FC<EditableSelectProps> = ({
  label,
  value,
  displayValue,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onChange,
  options
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <div className="flex-1">
              <Select
                value={value}
                onChange={onChange}
                options={options}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={<Check size={14} />}
              onClick={onSave}
              className="text-green-400 hover:text-green-300"
              title="ذخیره"
            />
            <Button
              variant="ghost"
              size="sm"
              icon={<X size={14} />}
              onClick={onCancel}
              className="text-red-400 hover:text-red-300"
              title="لغو"
            />
          </>
        ) : (
          <>
            <div className="flex-1">
              <div className="py-2.5">{displayValue}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={<PencilSimple size={14} />}
              onClick={onEdit}
              className="text-gray-400 hover:text-white"
              title="ویرایش"
            />
          </>
        )}
      </div>
    </div>
  );
};

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [editingFields, setEditingFields] = useState<Record<string, boolean>>({});
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  // Mock user data - in real app, fetch from API based on id
  const user: User = {
    id: parseInt(id || "1"),
    name: "احمد محمدی",
    email: "ahmad@example.com",
    username: "ahmad_m",
    phoneNumber: "+98 912 345 6789",
    role: {
      id: 1,
      name: "admin",
      displayName: "ادمین کل",
      level: 3,
      color: "red",
      permissions: [
        {
          id: 1,
          name: "user_management",
          displayName: "مدیریت کاربران",
          category: "admin",
          description: "دسترسی کامل به مدیریت کاربران"
        },
        {
          id: 2,
          name: "bot_management",
          displayName: "مدیریت بات‌ها",
          category: "admin",
          description: "مدیریت و کنترل تمام بات‌ها"
        }
      ]
    },
    status: "active",
    planType: "enterprise",
    joinDate: "2024-01-15",
    lastLogin: "2024-09-19T10:30:00",
    isOnline: true,
    permissions: []
  };

  const activityLogs: UserActivity[] = [
    {
      id: 1,
      userId: user.id,
      action: "login",
      description: "ورود به سیستم",
      timestamp: "2024-09-19T10:30:00",
      ipAddress: "192.168.1.100"
    },
    {
      id: 2,
      userId: user.id,
      action: "bot_create",
      description: "ایجاد بات جدید با نام 'بات پشتیبانی'",
      timestamp: "2024-09-19T09:15:00",
      ipAddress: "192.168.1.100"
    },
    {
      id: 3,
      userId: user.id,
      action: "role_change",
      description: "تغییر نقش کاربر از 'ویرایشگر' به 'ادمین کل'",
      timestamp: "2024-09-18T14:20:00",
      ipAddress: "192.168.1.100"
    }
  ];

  const roleOptions = [
    { value: "admin", label: "ادمین کل" },
    { value: "editor", label: "ویرایشگر" },
    { value: "user", label: "کاربر عادی" },
  ];

  const statusOptions = [
    { value: "active", label: "فعال" },
    { value: "inactive", label: "غیرفعال" },
    { value: "suspended", label: "مسدود" },
    { value: "pending", label: "در انتظار تایید" },
  ];

  const planOptions = [
    { value: "free", label: "رایگان" },
    { value: "basic", label: "پایه" },
    { value: "premium", label: "پریمیوم" },
    { value: "enterprise", label: "سازمانی" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">فعال</Badge>;
      case "inactive":
        return <Badge variant="default">غیرفعال</Badge>;
      case "suspended":
        return <Badge variant="danger">مسدود</Badge>;
      case "pending":
        return <Badge variant="warning">در انتظار</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return <Badge variant="danger">سازمانی</Badge>;
      case "premium":
        return <Badge variant="warning">پریمیوم</Badge>;
      case "basic":
        return <Badge variant="primary">پایه</Badge>;
      case "free":
        return <Badge variant="default">رایگان</Badge>;
      default:
        return <Badge variant="default">{plan}</Badge>;
    }
  };

  const getRoleBadge = (role: any) => {
    const colorMap: Record<string, "primary" | "success" | "danger" | "warning" | "info"> = {
      red: "danger",
      green: "success",
      blue: "primary",
      yellow: "warning",
      cyan: "info",
    };
    return (
      <Badge variant={colorMap[role.color] || "default"}>
        {role.displayName}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR');
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('fa-IR')} - ${date.toLocaleTimeString('fa-IR', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  };

  const handleFieldEdit = (fieldName: string) => {
    setEditingFields(prev => ({ ...prev, [fieldName]: true }));
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: getFieldValue(fieldName)
    }));
  };

  const handleFieldSave = (fieldName: string) => {
    // Here you would make API call to save the specific field
    console.log(`Saving field ${fieldName}:`, fieldValues[fieldName]);
    setEditingFields(prev => ({ ...prev, [fieldName]: false }));
    // Update the user data here in real implementation
  };

  const handleFieldCancel = (fieldName: string) => {
    setEditingFields(prev => ({ ...prev, [fieldName]: false }));
    setFieldValues(prev => {
      const newValues = { ...prev };
      delete newValues[fieldName];
      return newValues;
    });
  };

  const getFieldValue = (fieldName: string): string => {
    switch (fieldName) {
      case 'name': return user.name;
      case 'username': return user.username;
      case 'email': return user.email;
      case 'phoneNumber': return user.phoneNumber || '';
      case 'role': return user.role.name;
      case 'status': return user.status;
      case 'planType': return user.planType;
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="ghost"
                size="lg"
                icon={<ArrowLeft size={20} />}
                onClick={() => navigate("/user-management/list")}>
                بازگشت
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  پروفایل کاربر
                </h1>
                <p className="text-gray-300 mt-1">
                  مشاهده و مدیریت اطلاعات کاربر
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700">
            <div className="border-b border-gray-600 p-6">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <UserIcon size={20} className="ml-2" />
                اطلاعات پایه
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-start space-x-6 space-x-reverse mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {user.name.charAt(0)}
                  </div>
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-gray-800 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EditableField
                      label="نام و نام خانوادگی"
                      value={fieldValues.name || user.name}
                      fieldName="name"
                      isEditing={editingFields.name || false}
                      onEdit={() => handleFieldEdit('name')}
                      onSave={() => handleFieldSave('name')}
                      onCancel={() => handleFieldCancel('name')}
                      onChange={(value) => setFieldValues(prev => ({ ...prev, name: value }))}
                      placeholder="نام کاربر"
                    />
                    <EditableField
                      label="نام کاربری"
                      value={fieldValues.username ? `@${fieldValues.username}` : `@${user.username}`}
                      fieldName="username"
                      isEditing={editingFields.username || false}
                      onEdit={() => handleFieldEdit('username')}
                      onSave={() => handleFieldSave('username')}
                      onCancel={() => handleFieldCancel('username')}
                      onChange={(value) => setFieldValues(prev => ({ ...prev, username: value }))}
                      placeholder="نام کاربری"
                    />
                    <EditableField
                      label="ایمیل"
                      value={fieldValues.email || user.email}
                      fieldName="email"
                      isEditing={editingFields.email || false}
                      onEdit={() => handleFieldEdit('email')}
                      onSave={() => handleFieldSave('email')}
                      onCancel={() => handleFieldCancel('email')}
                      onChange={(value) => setFieldValues(prev => ({ ...prev, email: value }))}
                      placeholder="ایمیل"
                      type="email"
                    />
                    <EditableField
                      label="شماره تلفن"
                      value={fieldValues.phoneNumber || user.phoneNumber || ""}
                      fieldName="phoneNumber"
                      isEditing={editingFields.phoneNumber || false}
                      onEdit={() => handleFieldEdit('phoneNumber')}
                      onSave={() => handleFieldSave('phoneNumber')}
                      onCancel={() => handleFieldCancel('phoneNumber')}
                      onChange={(value) => setFieldValues(prev => ({ ...prev, phoneNumber: value }))}
                      placeholder="شماره تلفن"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role and Permissions */}
          <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700">
            <div className="border-b border-gray-600 p-6">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <Shield size={20} className="ml-2" />
                نقش و دسترسی‌ها
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <EditableSelect
                  label="نقش کاربری"
                  value={fieldValues.role || user.role.name}
                  displayValue={getRoleBadge(user.role)}
                  fieldName="role"
                  isEditing={editingFields.role || false}
                  onEdit={() => handleFieldEdit('role')}
                  onSave={() => handleFieldSave('role')}
                  onCancel={() => handleFieldCancel('role')}
                  onChange={(value) => setFieldValues(prev => ({ ...prev, role: value }))}
                  options={roleOptions}
                />
                <EditableSelect
                  label="وضعیت"
                  value={fieldValues.status || user.status}
                  displayValue={getStatusBadge(user.status)}
                  fieldName="status"
                  isEditing={editingFields.status || false}
                  onEdit={() => handleFieldEdit('status')}
                  onSave={() => handleFieldSave('status')}
                  onCancel={() => handleFieldCancel('status')}
                  onChange={(value) => setFieldValues(prev => ({ ...prev, status: value }))}
                  options={statusOptions}
                />
                <EditableSelect
                  label="نوع پلن"
                  value={fieldValues.planType || user.planType}
                  displayValue={getPlanBadge(user.planType)}
                  fieldName="planType"
                  isEditing={editingFields.planType || false}
                  onEdit={() => handleFieldEdit('planType')}
                  onSave={() => handleFieldSave('planType')}
                  onCancel={() => handleFieldCancel('planType')}
                  onChange={(value) => setFieldValues(prev => ({ ...prev, planType: value }))}
                  options={planOptions}
                />
              </div>

              {user.role.permissions.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">دسترسی‌های خاص:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {user.role.permissions.map((permission) => (
                      <div key={permission.id} className="bg-gray-700 rounded-lg p-3">
                        <div className="font-medium text-white">{permission.displayName}</div>
                        <div className="text-sm text-gray-400">{permission.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700">
            <div className="border-b border-gray-600 p-6">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <Activity size={20} className="ml-2" />
                تاریخچه فعالیت
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-gray-700 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{log.description}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        {formatDateTime(log.timestamp)}
                        {log.ipAddress && ` • IP: ${log.ipAddress}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700">
            <div className="border-b border-gray-600 p-6">
              <h2 className="text-lg font-semibold text-white">آمار سریع</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">شناسه کاربر:</span>
                <span className="font-mono text-white">#{user.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">تاریخ عضویت:</span>
                <span className="text-white">{formatDate(user.joinDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">آخرین ورود:</span>
                <span className="text-white">
                  {user.lastLogin ? formatDateTime(user.lastLogin) : "هرگز"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">وضعیت آنلاین:</span>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ml-2 ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-white">{user.isOnline ? "آنلاین" : "آفلاین"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-2xl shadow-sm border border-gray-700">
            <div className="border-b border-gray-600 p-6">
              <h2 className="text-lg font-semibold text-white">عملیات سریع</h2>
            </div>
            <div className="p-6 space-y-3">
              <Button variant="outline" fullWidth>
                ارسال پیام
              </Button>
              <Button variant="outline" fullWidth>
                تغییر رمز عبور
              </Button>
              <Button variant="outline" fullWidth>
                مسدود کردن کاربر
              </Button>
              <Button variant="danger" fullWidth>
                حذف کاربر
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;