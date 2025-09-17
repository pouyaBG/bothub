import React, { useState } from "react";
import { Robot, Plus, Eye, Gear, Trash, CheckCircle, XCircle } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

const BotsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const bots = [
    {
      id: 1,
      name: "فیلترشکن بات",
      username: "@vpn_bot",
      status: "فعال",
      users: "1.2k",
      lastActivity: "2 دقیقه پیش",
      type: "فروش VPN",
    },
    {
      id: 2,
      name: "پشتیبانی بات",
      username: "@support_bot",
      status: "فعال",
      users: "856",
      lastActivity: "5 دقیقه پیش",
      type: "پشتیبانی",
    },
    {
      id: 3,
      name: "گیم بات",
      username: "@game_bot",
      status: "غیرفعال",
      users: "342",
      lastActivity: "2 ساعت پیش",
      type: "سرگرمی",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">لیست بات‌ها</h1>
            <p className="text-gray-600 mt-1">مدیریت و نظارت بر بات‌های تلگرام</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<Plus size={20} />}
            onClick={() => navigate("/bots/add")}
          >
            افزودن بات جدید
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <Input
            placeholder="جستجو در بات‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputSize="lg"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {bots.map((bot) => (
            <div key={bot.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Robot size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{bot.name}</h3>
                    <p className="text-sm text-gray-500">{bot.username}</p>
                  </div>
                </div>
                {bot.status === "فعال" ? (
                  <CheckCircle size={20} className="text-green-500" />
                ) : (
                  <XCircle size={20} className="text-red-500" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">نوع</p>
                  <p className="font-medium text-gray-900">{bot.type}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">کاربران</p>
                  <p className="font-medium text-gray-900">{bot.users}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">آخرین فعالیت:</p>
                <p className="text-sm font-medium text-gray-900">{bot.lastActivity}</p>
              </div>

              <div className="flex space-x-2 space-x-reverse">
                <Button variant="primary" size="sm" icon={<Eye size={16} />}>
                  مشاهده
                </Button>
                <Button variant="secondary" size="sm" icon={<Gear size={16} />}>
                  تنظیمات
                </Button>
                <Button variant="ghost" size="sm" icon={<Trash size={16} />} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">راهنمای سریع</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• برای افزودن بات جدید، توکن آن را از @BotFather دریافت کنید</li>
            <li>• هر بات می‌تواند چندین پلاگین داشته باشد</li>
            <li>• تنظیمات هر بات به صورت جداگانه قابل مدیریت است</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BotsList;