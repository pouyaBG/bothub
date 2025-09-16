import { ChatCircle, Clock, PaperPlaneTilt, Users } from "phosphor-react";
import React, { useState } from "react";
import Button from "../../components/ui/button";

const Messaging: React.FC = () => {
  const [message, setMessage] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("all");

  const recentMessages = [
    { id: 1, text: "پیام تست جدید", audience: "همه کاربران", sentAt: "۱۰ دقیقه پیش", status: "ارسال شده" },
    { id: 2, text: "اطلاعیه مهم", audience: "ادمین‌ها", sentAt: "۱ ساعت پیش", status: "ارسال شده" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900">ارسال پیام</h1>
          <p className="text-gray-600 mt-1">ارسال پیام به کاربران</p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              مخاطبان
            </label>
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">همه کاربران</option>
              <option value="admins">ادمین‌ها</option>
              <option value="users">کاربران عادی</option>
              <option value="active">کاربران فعال</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              متن پیام
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="متن پیام خود را وارد کنید..."
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="primary"
              size="lg"
              icon={<PaperPlaneTilt size={20} />}
              disabled={!message.trim()}>
              ارسال پیام
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900">پیام‌های اخیر</h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {recentMessages.map((msg) => (
              <div key={msg.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <ChatCircle size={16} className="text-blue-500" />
                    <span className="font-medium text-gray-900">{msg.text}</span>
                  </div>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {msg.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Users size={14} />
                    <span>{msg.audience}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Clock size={14} />
                    <span>{msg.sentAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;