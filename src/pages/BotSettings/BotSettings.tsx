import { Robot, Shield } from "phosphor-react";
import React, { useState } from "react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

const BotSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    botName: "ربات پشتیبانی",
    botUsername: "@support_bot",
    welcomeMessage: "به ربات ما خوش آمدید!",
    adminNotifications: true,
    autoReply: true,
    maintenanceMode: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">تنظیمات ربات</h1>
          <p className="text-gray-600 mt-1">پیکربندی عمومی و امنیتی ربات</p>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2 space-x-reverse">
              <Robot size={20} className="text-blue-500" />
              <span>تنظیمات عمومی</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="نام ربات"
                value={settings.botName}
                onChange={(e) => handleInputChange("botName", e.target.value)}
                placeholder="نام ربات را وارد کنید"
                inputSize="lg"
              />
              <Input
                label="نام کاربری ربات"
                value={settings.botUsername}
                onChange={(e) => handleInputChange("botUsername", e.target.value)}
                placeholder="@bot_username"
                inputSize="lg"
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  پیام خوش‌آمدگویی
                </label>
                <textarea
                  value={settings.welcomeMessage}
                  onChange={(e) => handleInputChange("welcomeMessage", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="پیام خوش‌آمدگویی را وارد کنید"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2 space-x-reverse">
              <Shield size={20} className="text-green-500" />
              <span>تنظیمات امنیتی</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">اعلان‌های ادمین</h4>
                  <p className="text-sm text-gray-600">دریافت اعلان برای فعالیت‌های مهم</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.adminNotifications}
                    onChange={(e) => handleInputChange("adminNotifications", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">پاسخ خودکار</h4>
                  <p className="text-sm text-gray-600">فعال‌سازی پاسخ‌های خودکار</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoReply}
                    onChange={(e) => handleInputChange("autoReply", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <h4 className="font-medium text-red-900">حالت تعمیر</h4>
                  <p className="text-sm text-red-600">غیرفعال‌سازی موقت ربات</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleInputChange("maintenanceMode", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button variant="primary" size="lg">
              ذخیره تغییرات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotSettings;