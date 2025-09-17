import {
  CheckCircle,
  Eye,
  Gear,
  Plus,
  Robot,
  Trash,
  XCircle,
} from "phosphor-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import { useBots, useDeleteBot } from "../../hooks/useBots";

const BotsListWithQuery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // React Query hooks
  const { data: bots, isLoading, error, refetch } = useBots();
  const deleteBot = useDeleteBot();

  // Filter bots based on search term
  const filteredBots =
    bots?.filter(
      (bot) =>
        bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleDeleteBot = async (id: number) => {
    if (window.confirm("آیا از حذف این بات اطمینان دارید؟")) {
      try {
        await deleteBot.mutateAsync(id);
      } catch (error) {
        console.error("خطا در حذف بات:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <LoadingSpinner size="large" className="h-32" />
        <p className="text-center text-gray-600 mt-4">
          در حال بارگذاری بات‌ها...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="text-center">
          <XCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            خطا در بارگذاری داده‌ها
          </h3>
          <p className="text-gray-600 mb-4">
            امکان دریافت اطلاعات بات‌ها وجود ندارد
          </p>
          <Button onClick={() => refetch()} variant="primary">
            تلاش مجدد
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">لیست بات‌ها</h1>
            <p className="text-gray-600 mt-1">
              مدیریت و نظارت بر بات‌های تلگرام
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<Plus size={20} />}
            onClick={() => navigate("/bots/add")}>
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

        {filteredBots.length === 0 ? (
          <div className="text-center py-12">
            <Robot size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? "نتیجه‌ای یافت نشد" : "هیچ باتی وجود ندارد"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "جستجوی خود را تغییر دهید"
                : "اولین بات خود را اضافه کنید"}
            </p>
            {!searchTerm && (
              <Button
                variant="primary"
                icon={<Plus size={20} />}
                onClick={() => navigate("/bots/add")}>
                افزودن بات جدید
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBots.map((bot) => (
              <div
                key={bot.id}
                className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Robot size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {bot.name}
                      </h3>
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
                  <p className="text-sm font-medium text-gray-900">
                    {bot.lastActivity}
                  </p>
                </div>

                <div className="flex space-x-2 space-x-reverse">
                  <Button variant="primary" size="sm" icon={<Eye size={16} />}>
                    مشاهده
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Gear size={16} />}>
                    تنظیمات
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Trash size={16} />}
                    onClick={() => handleDeleteBot(bot.id)}
                    disabled={deleteBot.isPending}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            راهنمای سریع
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • برای افزودن بات جدید، توکن آن را از @BotFather دریافت کنید
            </li>
            <li>• هر بات می‌تواند چندین پلاگین داشته باشد</li>
            <li>• تنظیمات هر بات به صورت جداگانه قابل مدیریت است</li>
            <li>• از React Query برای مدیریت داده‌ها استفاده می‌شود</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BotsListWithQuery;
