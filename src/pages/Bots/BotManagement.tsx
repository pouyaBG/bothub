import React from "react";
import { useParams } from "react-router-dom";

const BotManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen flex flex-col gap-6 bg-slate-900">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">مدیریت ربات #{id}</h1>
            <p className="text-gray-300 mt-1">تنظیمات و مدیریت ربات</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-600 rounded-xl p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            صفحه مدیریت ربات
          </h2>
          <p className="text-gray-300">
            این صفحه در حال توسعه است. شناسه ربات: {id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BotManagement;
