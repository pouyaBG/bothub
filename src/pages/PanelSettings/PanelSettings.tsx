import { Palette, SquaresFour } from "phosphor-react";
import React, { useState } from "react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

const PanelSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    panelTitle: "داشبورد بات‌ها",
    language: "fa",
    theme: "light",
    timezone: "Asia/Tehran",
    itemsPerPage: "10",
    autoSave: true,
    compactMode: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900">تنظیمات پنل</h1>
        <p className="text-gray-600 mt-1">پیکربندی ظاهر و رفتار پنل مدیریت</p>
      </div>

      <div className="p-6 space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2 space-x-reverse">
            <SquaresFour size={20} className="text-blue-500" />
            <span>تنظیمات عمومی</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="عنوان پنل"
              value={settings.panelTitle}
              onChange={(e) => handleInputChange("panelTitle", e.target.value)}
              placeholder="عنوان پنل را وارد کنید"
              inputSize="lg"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                زبان پنل
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleInputChange("language", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="fa">فارسی</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                منطقه زمانی
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => handleInputChange("timezone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Asia/Tehran">تهران</option>
                <option value="Asia/Dubai">دبی</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تعداد آیتم در صفحه
              </label>
              <select
                value={settings.itemsPerPage}
                onChange={(e) => handleInputChange("itemsPerPage", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2 space-x-reverse">
            <Palette size={20} className="text-purple-500" />
            <span>تنظیمات ظاهری</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تم پنل
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div
                  onClick={() => handleInputChange("theme", "light")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    settings.theme === "light" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}>
                  <div className="w-full h-8 bg-white rounded mb-2 border border-gray-200"></div>
                  <p className="text-sm text-center">روشن</p>
                </div>
                <div
                  onClick={() => handleInputChange("theme", "dark")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    settings.theme === "dark" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}>
                  <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                  <p className="text-sm text-center">تیره</p>
                </div>
                <div
                  onClick={() => handleInputChange("theme", "auto")}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    settings.theme === "auto" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}>
                  <div className="w-full h-8 bg-gradient-to-r from-white to-gray-800 rounded mb-2"></div>
                  <p className="text-sm text-center">خودکار</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">ذخیره خودکار</h4>
                <p className="text-sm text-gray-600">ذخیره خودکار تغییرات</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) => handleInputChange("autoSave", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">حالت فشرده</h4>
                <p className="text-sm text-gray-600">نمایش فشرده‌تر اطلاعات</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.compactMode}
                  onChange={(e) => handleInputChange("compactMode", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
  );
};

export default PanelSettings;