import { ChatCircle, Lightning, Robot, Users } from 'phosphor-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-slate-600/30">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          داشبورد
        </h1>
        <p className="text-gray-300">
          به داشبورد مدیریت بات‌ها خوش آمدید. از طریق سایدبار می‌توانید به بخش‌های مختلف دسترسی داشته باشید.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-lg p-6 text-white border border-slate-600/30">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500/20 rounded-full">
              <Robot size={24} className="text-blue-400" />
            </div>
            <div className="mr-4">
              <h3 className="text-lg font-semibold text-gray-200">تعداد بات‌ها</h3>
              <p className="text-2xl font-bold text-blue-400">12</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-lg p-6 text-white border border-slate-600/30">
          <div className="flex items-center">
            <div className="p-3 bg-green-500/20 rounded-full">
              <Users size={24} className="text-green-400" />
            </div>
            <div className="mr-4">
              <h3 className="text-lg font-semibold text-gray-200">کاربران فعال</h3>
              <p className="text-2xl font-bold text-green-400">248</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-lg p-6 text-white border border-slate-600/30">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <ChatCircle size={24} className="text-purple-400" />
            </div>
            <div className="mr-4">
              <h3 className="text-lg font-semibold text-gray-200">پیام‌های امروز</h3>
              <p className="text-2xl font-bold text-purple-400">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-lg p-6 text-white border border-slate-600/30">
          <div className="flex items-center">
            <div className="p-3 bg-orange-500/20 rounded-full">
              <Lightning size={24} className="text-orange-400" />
            </div>
            <div className="mr-4">
              <h3 className="text-lg font-semibold text-gray-200">وضعیت سیستم</h3>
              <p className="text-lg font-bold text-green-400">آنلاین</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;