import { CheckCircle, Download, Plus, PuzzlePiece, Trash, XCircle } from "phosphor-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

const PluginsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const plugins = [
    {
      id: 1,
      name: "فیلترشکن",
      description: "فروش اکانت‌های فیلترشکن",
      version: "1.2.0",
      status: "فعال",
      installed: true,
    },
    {
      id: 2,
      name: "پشتیبانی",
      description: "سیستم تیکت و پشتیبانی",
      version: "2.1.5",
      status: "فعال",
      installed: true,
    },
    {
      id: 3,
      name: "آمار پیشرفته",
      description: "گزارش‌های تفصیلی کاربران",
      version: "1.0.0",
      status: "غیرفعال",
      installed: false,
    },
  ];

  const availablePlugins = [
    {
      id: 4,
      name: "کریپتو والت",
      description: "مدیریت کیف پول کریپتو",
      version: "1.1.0",
      downloads: "1.2k",
      rating: 4.8,
    },
    {
      id: 5,
      name: "انتشار محتوا",
      description: "انتشار خودکار محتوا در کانال‌ها",
      version: "2.0.0",
      downloads: "850",
      rating: 4.5,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">لیست پلاگین‌ها</h1>
              <p className="text-gray-600 mt-1">مدیریت پلاگین‌ها و امکانات اضافی</p>
            </div>
            <Button
              variant="primary"
              size="lg"
              icon={<Plus size={20} />}
              onClick={() => navigate("/plugins/add")}
            >
              افزودن پلاگین
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <Input
              placeholder="جستجو در پلاگین‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              inputSize="lg"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">پلاگین‌های نصب شده</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {plugins.map((plugin) => (
              <div key={plugin.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <PuzzlePiece size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{plugin.name}</h4>
                      <p className="text-sm text-gray-500">v{plugin.version}</p>
                    </div>
                  </div>
                  {plugin.status === "فعال" ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <XCircle size={20} className="text-red-500" />
                  )}
                </div>
                <p className="text-gray-600 mb-4">{plugin.description}</p>
                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    variant={plugin.status === "فعال" ? "danger" : "primary"}
                    size="sm"
                    fullWidth>
                    {plugin.status === "فعال" ? "غیرفعال" : "فعال‌سازی"}
                  </Button>
                  <Button variant="ghost" size="sm" icon={<Trash size={16} />} />
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">پلاگین‌های در دسترس</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availablePlugins.map((plugin) => (
              <div key={plugin.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <PuzzlePiece size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{plugin.name}</h4>
                    <p className="text-sm text-gray-500">v{plugin.version}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{plugin.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{plugin.downloads} دانلود</span>
                  <span>⭐ {plugin.rating}</span>
                </div>
                <Button variant="primary" size="sm" fullWidth icon={<Download size={16} />}>
                  نصب
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PluginsList;